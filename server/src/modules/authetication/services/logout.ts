import db from '../models/db';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import response from '../helpers/response';
import { anyObject, responseObject } from '../../../common_types/object';
import custom_error from '../helpers/custom_error';
import error_trace from '../helpers/error_trace';
import Models from '../../../database/models';
import logoutHistoryUpdate from '../../user_login_histories/services/update';

async function logout(
    fastify_instance: FastifyInstance,
    req: FastifyRequest, reply: FastifyReply,
): Promise<responseObject> {
    // const models = await db();
    let models = Models.get();
    const authUser = (req as anyObject).user;

    try {
        const userModel = models.UserModel;

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
        

        (req as anyObject).body = {
            ...(typeof req.body === 'object' && req.body !== null ? req.body : {}), 
            user_id: authUser.id,
        };
        console.log('req body ====> ', req.body);

        try {
            await logoutHistoryUpdate(fastify_instance, req);
        } catch (err) {
            console.error("Error in logoutHistoryUpdate:", err);
        }

        return reply.redirect(`/login`);
    } catch (error: any) {
        const uid = await error_trace(models, error, req.url, req.params);
        throw error instanceof custom_error
            ? { ...error, uid }
            : new custom_error('server error', 500, error.message, uid);
    }
}

export default logout;
