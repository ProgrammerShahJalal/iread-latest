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
        'event_id',
        'user_id',
        'event_enrollment_id',
        'date',
        'amount',
        'trx_id',
    ];

    for (let index = 0; index < fields.length; index++) {
        const field = fields[index];
        await body(field)
            .not()
            .isEmpty()
            .withMessage(
                `the <b>${field.replaceAll('_', ' ')}</b> field is required`,
            )
            .run(req);
    }

    let result = await validationResult(req);

    return result;
}

const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`, {
    apiVersion: process.env.STRIPE_API_VERSION as any,
});

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

    let inputs: InferCreationAttributes<typeof data> = {
        event_id: body.event_id || body.event_id?.[1],
        user_id: body.user_id || body.user_id?.[1],
        event_enrollment_id:
            body.event_enrollment_id || body.event_enrollment_id?.[1],
        event_payment_id: body.event_payment_id,
        date: body.date,
        amount: body.amount,
        trx_id: body.trx_id,
        media: body.media,
        is_refunded: body.is_refunded || false,
    };

    /** store data into database */
    try {
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
