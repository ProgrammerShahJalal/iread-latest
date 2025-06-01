'use strict';
import Stripe from 'stripe';
import {
    FastifyReply,
    FastifyRequest,
    FastifyInstance,
} from 'fastify';
import all from './services/all';
import details from './services/details';
import soft_delete from './services/soft_delete';
import store from './services/store';
import { responseObject } from '../../common_types/object';
import update from './services/update';
import restore from './services/restore';
import destroy from './services/destroy';
import data_import from './services/import';
import payment_refunds from './services/payment_refunds';
import Models from '../../database/models';
import { modelName } from './models/model';
import { handleFailedPayment, handleSuccessfulPayment } from './services/webhook';


const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`, {
    apiVersion: process.env.STRIPE_API_VERSION as any,
});

// Helper function to handle service errors
function handleServiceError(error: any, res: FastifyReply) {
    // Handle custom_error instances
    if (error.code && error.name && error.message) {
        return res.code(error.code).send({
            status: error.code,
            message: error.name,
            data: error.uid ? { uid: error.uid, details: error.message } : { details: error.message }
        });
    }

    // Handle unexpected errors
    console.error('Unexpected error:', error);
    return res.code(500).send({
        status: 500,
        message: 'Internal server error',
        data: null
    });
}

export default function (fastify: FastifyInstance) {
    return {
        all: async function (req: FastifyRequest, res: FastifyReply) {
            try {
                let data: responseObject = await all(fastify, req);
                return res
                    .code(data.status)
                    .header('Cache-Control', 'public, max-age=30')
                    .send(data);
            } catch (error: any) {
                return handleServiceError(error, res);
            }
        },

        find: async function (req: FastifyRequest, res: FastifyReply) {
            try {
                let data = await details(fastify, req);
                return res.code(data.status).send(data);
            } catch (error: any) {
                return handleServiceError(error, res);
            }
        },
        session: async function (req: FastifyRequest, res: FastifyReply) {
            try {
                let data: responseObject = await store(fastify, req);
                return res.code(data.status).send(data);
            } catch (error: any) {
                return handleServiceError(error, res);
            }
        },
        // Handle Stripe Webhook

        webhook: async function handleStripeWebhook(
            req: FastifyRequest,
            res: FastifyReply,
        ) {
            const sig = req?.headers['stripe-signature'] as string;

            if (process.env.NODE_ENV === 'development') {
                console.log(
                    'Skipping signature verification in development mode',
                );
                return res.status(200).send({ success: true });
            }

            if (!sig) {
                return res.status(400).send({
                    success: false,
                    message: 'Missing Stripe signature header.',
                });
            }

            let event: Stripe.Event;

            try {
                event = stripe.webhooks.constructEvent(
                    req.body as Buffer,
                    sig,
                    process.env.STRIPE_WEBHOOK_SECRET as string, // Use env variable
                );
            } catch (err: any) {
                console.error(
                    'Webhook signature verification failed:',
                    err.message,
                );
                return res.status(400).send({
                    success: false,
                    message: 'Webhook signature verification failed.',
                });
            }

            try {
                // Handle the event
                switch (event.type) {
                    case 'checkout.session.completed':
                        const session = event.data.object as Stripe.Checkout.Session;
                        console.log('Payment successful:', session.id);

                        if (session.metadata && session.payment_status === 'paid') {
                            await handleSuccessfulPayment(
                                fastify,
                                session.id,
                                session.metadata as any
                            );
                        }
                        break;

                    case 'checkout.session.expired':
                        const expiredSession = event.data.object as Stripe.Checkout.Session;
                        console.log('Payment session expired:', expiredSession.id);

                        await handleFailedPayment(
                            fastify,
                            expiredSession.id,
                            'expired'
                        );
                        break;

                    case 'checkout.session.async_payment_failed':
                        const failedSession = event.data.object as Stripe.Checkout.Session;
                        console.log('Payment failed:', failedSession.id);

                        await handleFailedPayment(
                            fastify,
                            failedSession.id,
                            'failed'
                        );
                        break;

                    case 'payment_intent.payment_failed':
                        const failedPayment = event.data.object as Stripe.PaymentIntent;
                        console.log('Payment intent failed:', failedPayment.id);
                        // Handle payment intent failures if needed
                        break;

                    default:
                        console.warn(`Unhandled event type: ${event.type}`);
                }

                return res.status(200).send({
                    success: true,
                    message: 'Webhook processed successfully'
                });

            } catch (error: any) {
                console.error('Error processing webhook:', error);
                return res.status(500).send({
                    success: false,
                    message: 'Error processing webhook'
                });
            }
        },

        store: async function (req: FastifyRequest, res: FastifyReply) {
            try {
                let data: responseObject = await store(fastify, req);
                return res.code(data.status).send(data);
            } catch (error: any) {
                return handleServiceError(error, res);
            }
        },

        update: async function (req: FastifyRequest, res: FastifyReply) {
            try {
                let data: responseObject = await update(fastify, req);
                return res.code(data.status).send(data);
            } catch (error: any) {
                return handleServiceError(error, res);
            }
        },

        payment_refunds: async function (req: FastifyRequest, res: FastifyReply) {
            try {
                let data: responseObject = await payment_refunds(fastify, req);
                return res.code(data.status).send(data);
            } catch (error: any) {
                return handleServiceError(error, res);
            }
        },

        soft_delete: async function (req: FastifyRequest, res: FastifyReply) {
            try {
                let data = await soft_delete(fastify, req);
                return res.code(data.status).send(data);
            } catch (error: any) {
                return handleServiceError(error, res);
            }
        },

        restore: async function (req: FastifyRequest, res: FastifyReply) {
            try {
                let data = await restore(fastify, req);
                return res.code(data.status).send(data);
            } catch (error: any) {
                return handleServiceError(error, res);
            }
        },

        destroy: async function (req: FastifyRequest, res: FastifyReply) {
            try {
                let data = await destroy(fastify, req);
                return res.code(data.status).send(data);
            } catch (error: any) {
                return handleServiceError(error, res);
            }
        },

        import: async function (req: FastifyRequest, res: FastifyReply) {
            try {
                let data = await data_import(fastify, req);
                return res.code(data.status).send(data);
            } catch (error: any) {
                return handleServiceError(error, res);
            }
        },

        // export: async function (req: FastifyRequest, res: FastifyReply) {},
    };
}
