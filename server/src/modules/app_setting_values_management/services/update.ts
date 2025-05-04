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
    let fields = [
        'id',
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
    const settingsTableRow = await models.AppSettinsgModel.findByPk(body?.app_setting_key_id);

    if (!settingsTableRow) {
        throw new Error('Setting not found');
    }

    /** Handle file upload if type is file */
    let valueToSave: string = body.value || '';
    if (settingsTableRow.type === 'file' && body.value?.ext && body.value?.name) {
        const image_path =
            'uploads/app_settings/' +
            moment().format('YYYYMMDDHHmmss') +
            body.value.name;
        await (fastify_instance as any).upload(body.value, image_path);
        valueToSave = image_path;
    }


    /** store data into database */
    try {
        let data = await models[modelName].findByPk(body.id);
        if (data) {

            let inputs: InferCreationAttributes<typeof user_model> = {
                app_setting_key_id: body.app_setting_key_id || data.app_setting_key_id,
                title: body.title || data.title,
                value: valueToSave,
                is_default: body.is_default || data.is_default,
                type: settingsTableRow.type || data?.type,
            };
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
