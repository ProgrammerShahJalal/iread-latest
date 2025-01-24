import db from '../models/db';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { body, validationResult } from 'express-validator';
import {
    anyObject,
    responseObject,
    Request,
} from '../../../common_types/object';
import { InferCreationAttributes } from 'sequelize';

import response from '../../../helpers/response';
import custom_error from '../../../helpers/custom_error';
import error_trace from '../../../helpers/error_trace';

import moment from 'moment';
import { modelName } from '../models/model';
import Models from '../../../database/models';

/** validation rules */
async function validate(req: Request) {
    let field = '';
    let fields = ['id'];

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

// async function update(
//     fastify_instance: FastifyInstance,
//     req: FastifyRequest,
// ): Promise<responseObject> {
//     throw new Error('500 test');
// }

async function update(
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
    let user_model = new models[modelName]();

    let image_path = 'avatar.png';
    if (body['poster']?.ext) {
        image_path =
            'uploads/events/' +
            moment().format('YYYYMMDDHHmmss') +
            body['poster'].name;
        await (fastify_instance as any).upload(body['poster'], image_path);
    }

    /** print request data into console */
    // console.clear();
    // (fastify_instance as any).print(inputs);

    /** store data into database */
    try {
        let data = await models[modelName].findByPk(body.id);
        let inputs: InferCreationAttributes<typeof user_model> = {
            title: body.title || data?.title,
            reg_start_date: body.reg_start_date || data?.reg_end_date,
            reg_end_date: body.reg_end_date || data?.reg_end_date,
            session_start_date_time:
                body.session_start_date_time || data?.session_start_date_time,
            session_end_date_time:
                body.session_end_date_time || data?.session_end_date_time,
            place: body.place || data?.place,
            short_description:
                body.short_description || data?.short_description,
            full_description: body.full_description || data?.full_description,
            pre_requisities: body.pre_requisities || data?.pre_requisities,
            terms_and_conditions:
                body.terms_and_conditions || data?.terms_and_conditions,
            event_type: body.event_type || data?.event_type,
            poster: image_path || (data?.poster as string),
            price: body.price || data?.price,
            discount_price: body.discount_price || data?.discount_price,
        };
        if (data) {
            data.update(inputs);
            await data.save();
            return response(201, 'data updated', { data });
        } else {
            throw new custom_error(
                'data not found',
                404,
                'operation not possible',
            );
        }
    } catch (error: any) {
        let uid = await error_trace(models, error, req.url, req.body);
        if (error instanceof custom_error) {
            error.uid = uid;
        } else {
            throw new custom_error('server error', 500, error.message, uid);
        }
        throw error;
    }
}

export default update;
