import db from '../models/db';
import { FastifyInstance, FastifyRequest } from 'fastify';
import response from '../helpers/response';
import { anyObject, responseObject } from '../../../common_types/object';
import custom_error from '../helpers/custom_error';
import error_trace from '../helpers/error_trace';

async function logout(
    fastify_instance: FastifyInstance,
    req: FastifyRequest,
): Promise<responseObject> {
    const models = await db();
    const authUser = (req as anyObject).user;
    console.log('auth account user', authUser);

    try {
        const userModel = models.User || models.UserParentsModel || models.UserStudentsModel;
        
        if (!userModel) {
            throw new custom_error('User model not found', 500, 'Invalid user model');
        }

        const user = await userModel.findOne({
            where: { id: authUser.id },
        });

        if (!user) {
            throw new custom_error('Expectation Failed', 417, 'Action not possible');
        }
        user.token = "";
        user.user_agent = "";
        await user.save();

        return response(217, 'logout', {});
    } catch (error: any) {
        const uid = await error_trace(models, error, req.url, req.params);
        throw error instanceof custom_error
            ? { ...error, uid }
            : new custom_error('server error', 500, error.message, uid);
    }
}

export default logout;
