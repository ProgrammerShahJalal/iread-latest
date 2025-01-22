import db from '../models/db';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { body, validationResult } from 'express-validator';
import {
    anyObject,
    responseObject,
    Request,
} from '../../../common_types/object';
import { InferCreationAttributes, json } from 'sequelize';
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
        'title',
        'reg_start_date',
        'reg_end_date',
        'session_start_date_time',
        'session_end_date_time',
        'place',
        'short_description',
        'full_description',
        'pre_requisities',
        'terms_and_conditions',
        'event_type',
        'poster',
        'price',
        'discount_price',

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


    let image_path = 'avatar.png';
    if (body['poster']?.ext) {
        image_path =
            'uploads/events/' +
            moment().format('YYYYMMDDHHmmss') +
            body['poster'].name;
        await (fastify_instance as any).upload(body['poster'], image_path);
    }

    console.log('body', body);

    let inputs: InferCreationAttributes<typeof data> = {
        title: body.title,
        reg_start_date: body.reg_start_date,
        reg_end_date: body.reg_end_date,
        session_start_date_time: body.session_start_date_time,
        session_end_date_time: body.session_end_date_time,
        place: body.place,
        short_description: body.short_description,
        full_description: body.full_description,
        pre_requisities: body.pre_requisities,
        terms_and_conditions: body.terms_and_conditions,
        event_type: body.event_type,
        poster: image_path,
        price: body.price,
        discount_price: body.discount_price,
    };

    try {

        (await data.update(inputs)).save();


        if (!data.id) {
            throw new Error('Failed to save data.');
        }


        return response(201, 'data created', { data });
    } catch (error: any) {
        let uid = await error_trace(models, error, req.url, req.body);
        throw new custom_error('server error', 500, error.message, uid);
    }
}

export default store;