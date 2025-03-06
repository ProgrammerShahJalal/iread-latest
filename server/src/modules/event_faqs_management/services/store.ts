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

import { modelName} from '../models/model';
import Models from '../../../database/models';

/** validation rules */
async function validate(req: Request) {
    let fields = ['title', 'description'];

    for (let field of fields) {
        await body(field)
            .not()
            .isEmpty()
            .withMessage(
                `The <b>${field.replaceAll('_', ' ')}</b> field is required`
            )
            .run(req);
    }

    let result = await validationResult(req);
    return result;
}

async function store(
    fastify_instance: FastifyInstance,
    req: FastifyRequest
): Promise<responseObject> {
    /** validation */
    let validate_result = await validate(req as Request);
    if (!validate_result.isEmpty()) {
        return response(422, 'Validation error', validate_result.array());
    }

    /** initializations */
    let models = Models.get();
    let body = req.body as anyObject;
    let data = new models[modelName]();

    let inputs: InferCreationAttributes<typeof data> = {
        event_id: body.events?.[1],
        title: body.title,
        description: body.description,
    };

    try {
        /** Store event data */
        let savedData = await (await data.update(inputs)).save();

        /** Parse and store FAQs */
        if (body.faqs) {
            let faqs = JSON.parse(body.faqs);
            if (Array.isArray(faqs)) {
                for (let faq of faqs) {
                    await models.EventFaqsModel.create({
                        event_id: savedData.id || 1, // Link FAQ to the event
                        title: faq.title,
                        description: faq.description,
                    });
                }
            }
        }

        return response(201, 'Data created successfully', { data: savedData });
    } catch (error: any) {
        let uid = await error_trace(models, error, req.url, req.body);
        throw new custom_error('Server error', 500, error.message, uid);
    }
}

export default store;
