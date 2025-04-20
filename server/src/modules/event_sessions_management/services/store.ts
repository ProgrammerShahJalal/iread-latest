import { FastifyInstance, FastifyRequest } from 'fastify';
import { body, validationResult } from 'express-validator';
import {
    anyObject,
    responseObject,
    Request,
} from '../../../common_types/object';
import { InferCreationAttributes, Op } from 'sequelize';
import moment from 'moment';

import response from '../../../helpers/response';
import custom_error from '../../../helpers/custom_error';
import error_trace from '../../../helpers/error_trace';

import { modelName } from '../models/model';
import Models from '../../../database/models';

/** validation rules */
async function validate(req: Request) {
    const fields = [
        { name: 'events', isArray: true },
        { name: 'title', isArray: false },
        { name: 'topics', isArray: false },
        { name: 'start', isArray: false },
        { name: 'end', isArray: false },
        { name: 'total_time', isArray: false },
    ];

    // Validate required fields
    for (const field of fields) {
        if (field.isArray) {
            await body(field.name)
                .isArray({ min: 1 })
                .withMessage(
                    `the <b>${field.name.replaceAll('_', ' ')}</b> field is required`,
                )
                .run(req);
        } else {
            await body(field.name)
                .not()
                .isEmpty()
                .withMessage(
                    `the <b>${field.name.replaceAll('_', ' ')}</b> field is required`,
                )
                .run(req);
        }
    }
    let models = Models.get();
    // Retrieve request data
    const bodyData = req.body as anyObject;

    // Validate start and end times
    if (bodyData?.start && bodyData?.end) {
        const startTime = moment(bodyData?.start, 'hh:mmA');
        const endTime = moment(bodyData?.end, 'hh:mmA');

        if (!startTime.isValid() || !endTime.isValid()) {
            throw new custom_error(
                'Invalid time format. Use hh:mmAM/PM format.',
                422,
                'Invalid time format',
            );
        }

        if (startTime.isSameOrAfter(endTime)) {
            throw new custom_error(
                'The start time must be before the end time.',
                422,
                'Invalid time range',
            );
        }

        // Calculate the duration in minutes
        const duration = moment.duration(endTime.diff(startTime)).asMinutes();
        if (duration !== parseInt(bodyData?.total_time, 10)) {
            throw new custom_error(
                `The total time should be ${duration} minutes based on start and end times.`,
                422,
                'Invalid total time',
            );
        }

        // Check for overlapping sessions
        const overlappingSession = await models[modelName].findOne({
            where: {
                [Op.or]: [
                    {
                        start: {
                            [Op.between]: [
                                startTime.format('HH:mm'),
                                endTime.format('HH:mm'),
                            ],
                        },
                    },
                    {
                        end: {
                            [Op.between]: [
                                startTime.format('HH:mm'),
                                endTime.format('HH:mm'),
                            ],
                        },
                    },
                    {
                        [Op.and]: [
                            { start: { [Op.lte]: startTime.format('HH:mm') } },
                            { end: { [Op.gte]: endTime.format('HH:mm') } },
                        ],
                    },
                ],
            },
        });

        if (overlappingSession) {
            throw new custom_error(
                'The selected time overlaps with another session.',
                422,
                'Time overlap',
            );
        }
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

    /** store data into database */
    try {
        let data = new models[modelName]();

        let inputs: InferCreationAttributes<typeof data> = {
            event_id: body.events?.[1],
            title: body.title,
            topics: body.topics,
            start: body.start,
            end: body.end,
            total_time: body.total_time,
        };

        (await data.update(inputs)).save();

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
