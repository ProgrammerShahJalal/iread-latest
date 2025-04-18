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

import moment from 'moment/moment';
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
    let models = await Models.get();
    let body = req.body as anyObject;
    let user_model = new models[modelName]();

    /** store data into database */

    let eventCategoryEventModel = models.EventCategoryEventModel;
    let EventTagEventModel = models.EventTagEventModel;

    let categories: number[] = JSON.parse(body['event_categories']) || [];
    let tags: number[] = JSON.parse(body['event_tags']) || [];

    try {
        let data = await models[modelName].findByPk(body.id);

        let image_path = data?.poster || 'avatar.png';
        if (body['poster']?.ext) {
            image_path =
                'uploads/events/' +
                moment().format('YYYYMMDDHHmmss') +
                body['poster'].name;
            await (fastify_instance as any).upload(body['poster'], image_path);
        }

        let inputs: InferCreationAttributes<typeof user_model> = {
            title: body.title || data?.title,
            reg_start_date: body.reg_start_date || data?.reg_start_date,
            reg_end_date: body.reg_end_date || data?.reg_end_date,
            session_start_date_time:
                moment(body.session_start_date_time).format(
                    'YYYY-MM-DD HH:mm:ss',
                ) || (data?.session_start_date_time as string),
            session_end_date_time:
                moment(body.session_end_date_time).format(
                    'YYYY-MM-DD HH:mm:ss',
                ) || (data?.session_end_date_time as string),
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
        // console.log('body', body);
        if (data) {
            data.update(inputs);
            await data.save();

            await eventCategoryEventModel.destroy({
                where: { event_id: data.id },
            });

            await Promise.all(
                categories.map(async (categoryId) => {
                    await eventCategoryEventModel.create({
                        event_id: data.id || 1,
                        event_category_id: categoryId,
                    });
                }),
            );

            await EventTagEventModel.destroy({
                where: { event_id: data.id },
            });

            await Promise.all(
                tags.map(async (tagId) => {
                    await EventTagEventModel.create({
                        event_id: data.id || 1,
                        event_tag_id: tagId,
                    });
                }),
            );
            console.log(
                '== after saving SESSION START DATE TIME',
                body.session_start_date_time,
            );
            console.log(
                '== after saving SESSION END DATE TIME',
                body.session_end_date_time,
            );
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
