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
 

const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`, {
    apiVersion: process.env.STRIPE_API_VERSION as any,
});

export default function (fastify: FastifyInstance) {
    return {
        all: async function (req: FastifyRequest, res: FastifyReply) {
            let data: responseObject = await all(fastify, req);
            return res
                .code(data.status)
                .header('Cache-Control', 'public, max-age=30')
                .send(data);
        },

        find: async function (req: FastifyRequest, res: FastifyReply) {
            let data = await details(fastify, req);
            res.code(data.status).send(data);
        },
        session: async function (req: FastifyRequest, res: FastifyReply) {
            let data: responseObject = await store(fastify, req);
            res.code(data.status).send(data);
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
                    req.body as Buffer, // Raw request body as a buffer
                    sig,
                    'whsec_SqL0lqb4ZCMI6wfrFy2g6a0hmAcxITjn' as string,
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

            // Handle the event
            switch (event.type) {
                case 'checkout.session.completed':
                    const session = event.data
                        .object as Stripe.Checkout.Session;
                    console.log('Payment successful:', session);
                    // Process the successful payment (e.g., save details to the database)
                    break;
                case 'payment_intent.succeeded':
                    const paymentIntent = event.data
                        .object as Stripe.PaymentIntent;
                    console.log('Payment intent succeeded:', paymentIntent);
                    break;
                default:
                    console.warn(`Unhandled event type: ${event.type}`);
            }

            return res
                .status(200)
                .send({ success: true, message: 'Webhook received.' });
        },

        store: async function (req: FastifyRequest, res: FastifyReply) {
            let data: responseObject = await store(fastify, req);
            res.code(data.status).send(data);
        },

        update: async function (req: FastifyRequest, res: FastifyReply) {
            let data: responseObject = await update(fastify, req);
            res.code(data.status).send(data);
        },

        payment_refunds: async function (req: FastifyRequest, res: FastifyReply) {
            let data: responseObject = await payment_refunds(fastify, req);
            res.code(data.status).send(data);
        },

        soft_delete: async function (req: FastifyRequest, res: FastifyReply) {
            let data = await soft_delete(fastify, req);
            res.code(data.status).send(data);
        },

        restore: async function (req: FastifyRequest, res: FastifyReply) {
            let data = await restore(fastify, req);
            res.code(data.status).send(data);
        },

        destroy: async function (req: FastifyRequest, res: FastifyReply) {
            let data = await destroy(fastify, req);
            res.code(data.status).send(data);
        },

        import: async function (req: FastifyRequest, res: FastifyReply) {
            let data = await data_import(fastify, req);
            res.code(data.status).send(data);
        },

        // export: async function (req: FastifyRequest, res: FastifyReply) {},
    };
}
