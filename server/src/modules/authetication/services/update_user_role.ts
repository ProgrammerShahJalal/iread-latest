import { FastifyInstance, FastifyRequest } from 'fastify';
import { responseObject } from '../../../common_types/object';
import response from '../helpers/response';
import { body, validationResult } from 'express-validator';
import custom_error from '../helpers/custom_error';
import error_trace from '../helpers/error_trace';
import Models from '../../../database/models';
import db from '../models/db';

async function validate(req: Request) {
    await body('user_id')
        .not()
        .isEmpty()
        .withMessage('User ID is required')
        .run(req);

    await body('role')
        .not()
        .isEmpty()
        .withMessage('Role is required')
        .run(req);

    let result = await validationResult(req);
    return result;
}

async function updateUserRole(fastify_instance: FastifyInstance, req: FastifyRequest): Promise<responseObject> {
    /** validation */
    let validate_result = await validate(req as unknown as Request);
    if (!validate_result.isEmpty()) {
        return response(422, 'Validation error', validate_result.array());
    }

    // let models = Models.get();
    let models = await db();
    let body = req.body as { user_id: number; role: string };

    try {
        let user = await models.User.findByPk(body.user_id);
        
        if (!user) {
            return response(404, 'User not found', {});
        }

        let role = await models.UserRolesModel.findOne({ where: { serial: body.user_id } });
        if (!role) {
            return response(404, 'Role not found', {});
        }

        await user.update({ role_serial: role.serial });
        return response(200, 'User role updated successfully', { user_id: user.id, new_role: body.role });

    } catch (error: any) {
        let uid = await error_trace(models, error, req.url, req.body);
        throw new custom_error('Server error', 500, error.message, uid);
    }
}

export default updateUserRole;
