import db from '../models/db';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import response from '../helpers/response';
import { anyObject, responseObject } from '../../../common_types/object';
import custom_error from '../helpers/custom_error';
import error_trace from '../helpers/error_trace';
import Models from '../../../database/models';
import logoutHistoryUpdate from '../../user_login_histories/services/update';
import { env } from 'process';


function parseCookieString(cookieString: string) {
    try {
        const cookieObj: any = {};
        const cookies = cookieString.split(';');
        cookies.forEach((cookie: string) => {
            const [key, value] = cookie.split('=');
            cookieObj[key.trim()] = decodeURIComponent(value);
        });
        return cookieObj;
    } catch (error) {
        return {};
    }
}


async function logout(
    fastify_instance: FastifyInstance,
    req: FastifyRequest, reply: FastifyReply,
): Promise<responseObject> {

    let models = Models.get();
    const secretKey = env.JTI;
    const jwt = require('jsonwebtoken');

    // Get token from cookies
    const token = parseCookieString(req.headers.cookie || '')?.token;
    if (!token) {
        console.log("No token found in cookies");
        throw new custom_error('Unauthorized', 401, 'No token provided');
    }

    try {
        const decoded = jwt.verify(token.slice(7), secretKey);
    
        let authUser = (req as anyObject)?.body?.user;
        
        if (!authUser) {
            authUser = { id: decoded.id }; // Use decoded token ID as fallback
        }
    
        const user = await models.UserModel.findOne({ where: { id: authUser?.id } });


        if (!user) {
            console.log("User not found");
            throw new custom_error('Expectation Failed', 417, 'Action not possible');
        }
        user.token = "";
        user.user_agent = "";
        await user.save();


        (req as anyObject).body = {
            ...(typeof req.body === 'object' && req.body !== null ? req.body : {}),
            user_id: authUser.id,
        };
        try {
            await logoutHistoryUpdate(fastify_instance, req);
        } catch (err) {
            console.error("Error in logoutHistoryUpdate:", err);
        }

        if ((req.body as any)?.from === "frontend") {
            console.log('logout from frontend');
            return response(200, 'Logout Successfully', {});
        } else {
            return reply.redirect(`/login`);
        }



    } catch (error: any) {
        const uid = await error_trace(models, error, req.url, req.params);
        throw error instanceof custom_error
            ? { ...error, uid }
            : new custom_error('server error', 500, error.message, uid);
    }
}

export default logout;
