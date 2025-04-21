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

/** validation rules */

async function validate(req: Request) {
    let field = '';
    let fields = [
        { name: 'event_id', isArray: true },
        { name: 'user_id', isArray: true },
        { name: 'event_enrollment_id', isArray: true },
        { name: 'event_payment_id', isArray: true },
        { name: 'trx_id', isArray: false },
        { name: 'date', isArray: false },
        { name: 'amount', isArray: false },
        { name: 'media', isArray: false },
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

    // Check if refund request already exists
    let existingRefund = await models[modelName].findOne({
        where: {
            user_id: body.user_id,
            event_id: body.event_id,
            event_enrollment_id: body.event_enrollment_id,
            event_payment_id: body.payment_id,
            trx_id: body.trx_id,
        },
    });

    if (existingRefund) {
        return response(409, 'Refund request already exists.', { existingRefund });
    }
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

        event_id: body.event_id?.[0] || body.event_id,
        user_id: body.user_id?.[0] || body.user_id,
        event_enrollment_id: body.event_enrollment_id?.[0] || body.event_enrollment_id,
        event_payment_id: body.payment_id?.[0] || body.payment_id,
        date: body.date || moment().toISOString(),
        amount: body.amount,
        trx_id: body.trx_id,
        media: body.media,
    };


    /** store data into database */
    try {
        (await data.update(inputs)).save();

        return response(201, 'Refund request send successfully.', {
            data,
        });
    } catch (error: any) {
        let uid = await error_trace(models, error, req.url, req.body);
        throw new custom_error('server error', 500, error.message, uid);
        // throw error;
    }
}

export default store;
