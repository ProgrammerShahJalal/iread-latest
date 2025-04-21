import db from '../models/db';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { body, validationResult } from 'express-validator';
import {
    anyObject,
    responseObject,
    Request,
} from '../../../common_types/object';
import { InferCreationAttributes } from 'sequelize';
import moment from 'moment';

import response from '../../../helpers/response';
import custom_error from '../../../helpers/custom_error';
import error_trace from '../../../helpers/error_trace';

import { modelName } from '../models/model';
import Models from '../../../database/models';
import Stripe from 'stripe';

/** validation rules */
async function validate(req: Request) {
    let field = '';
    let fields = [
        { name: 'event_id', isArray: true },
        { name: 'user_id', isArray: true },
        { name: 'event_enrollment_id', isArray: true },
        { name: 'date', isArray: false },
        { name: 'amount', isArray: false },
        { name: 'trx_id', isArray: false },
    ];

    //validate array fields
    for (const field of fields.filter(f => f.isArray)) {
        await body(field.name)
            .custom(value => {
                try {
                    const parsed = typeof value === 'string' ? JSON.parse(value) : value;
                    return Array.isArray(parsed) && parsed.length > 0;
                } catch {
                    return false;
                }
            })
            .withMessage(`the <b>${field.name.replaceAll('_', ' ')}</b> field is required`)
            .run(req);
    }

    // Validate other fields
    for (const field of fields.filter(f => !f.isArray)) {
        await body(field.name)
            .not()
            .isEmpty()
            .withMessage(`the <b>${field.name.replaceAll('_', ' ')}</b> field is required`)
            .run(req);
    }

    let result = await validationResult(req);

    return result;
}

const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`, {
    apiVersion: process.env.STRIPE_API_VERSION as any,
});

interface PaymentRequest {
    event_id: number;
    user_id: number;
    event_enrollment_id: number;
    date: string;
    amount: string;
    trx_id: string;
}

interface Payment {
    event_id: number;
    user_id: number;
    event_enrollment_id: number;
    date: string;
    amount: number;
    trx_id: string;
    session_id: string;
}

async function store(
    fastify_instance: FastifyInstance,
    req: FastifyRequest,
): Promise<responseObject> {
    /** validation */
    let validate_result = await validate(req as Request);
    if (!validate_result.isEmpty()) {
        return response(422, 'validation error', validate_result.array());
    }

    /** initializations */
    let models = Models.get();
    let body = req.body as anyObject;
    let data = new models[modelName]();

    const { user_id, event_id, event_enrollment_id, trx_id, amount } =
        req.body as PaymentRequest;

    /** store data into database */
    try {
        const amountInCents = Math.round(parseFloat(amount) * 100);
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: `User ID ${user_id}`,
                            description: `Event ID: ${event_id}, Event Enrollment ID: ${event_enrollment_id}, Trx ID: ${trx_id}`,
                        },
                        unit_amount: amountInCents,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/payment/success?user_id=${encodeURIComponent(user_id)}&event_id=${encodeURIComponent(event_id)}&event_enrollment_id=${encodeURIComponent(event_enrollment_id)}&trx_id=${encodeURIComponent(trx_id)}&amount=${amount}`,
            cancel_url: `${process.env.FRONTEND_URL}/payment/cancel`,
            metadata: {
                user_id,
                event_id,
                event_enrollment_id,
                trx_id,
            },
        } as Stripe.Checkout.SessionCreateParams);
        // console.log('Stripe Session:', session);

        // Parse fields that might be stringified
        const parseField = (field: any) => {
            try {
                return typeof field === 'string' ? JSON.parse(field) : field;
            } catch {
                return field;
            }
        };

        body.event_id = parseField(body.event_id);
        body.event_enrollment_id = parseField(body.event_enrollment_id);
        body.user_id = parseField(body.user_id);
        body.event_payment_id = parseField(body.event_payment_id);

        let inputs: InferCreationAttributes<typeof data> = {
            event_id: body.event_id || body.event_id?.[0],
            user_id: body.user_id || body.user_id?.[0],
            event_enrollment_id:
                body.event_enrollment_id || body.event_enrollment_id?.[0],
            event_payment_id: body.event_payment_id || body.event_payment_id?.[0],
            date: body.date,
            amount: body.amount,
            trx_id: body.trx_id,
            media: body.media,
            session_id: session?.id,
            is_refunded: body.is_refunded || false,
        };
        // Properly set and save the new data
        data.set(inputs);
        await data.save();

        // Update `is_paid` to true in the EventEnrollmentsModel
        await models.EventEnrollmentsModel.update(
            { is_paid: '1' },
            { where: { id: body.event_enrollment_id } },
        );

        return response(201, 'data created', {
            data,
        });
    } catch (error: any) {
        let uid = await error_trace(models, error, req.url, req.body);
        throw new custom_error('server error', 500, error.message, uid);
        // throw error;
    }
}

export default store;
