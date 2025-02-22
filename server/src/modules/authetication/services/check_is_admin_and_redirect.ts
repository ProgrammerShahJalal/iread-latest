import { FastifyReply, FastifyRequest } from 'fastify';
import { anyObject } from '../../../common_types/object';
import { env } from 'process';
import Models from '../../../database/models';

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
const FRONTEND_URL = process.env.NODE_ENV === "production"
    ? process.env.FRONTEND_LIVE_URL
    : process.env.FRONTEND_URL;

const check_is_admin_and_redirect = async (
    request: FastifyRequest,
    reply: FastifyReply,
) => {
    const secretKey = env.JTI;
    const jwt = require('jsonwebtoken');

    // Get token from cookies
    const token = parseCookieString(request.headers.cookie || '')?.token;

    if (!token || !token.startsWith('Bearer ')) {
        // return reply.redirect(`${process.env.FRONTEND_URL}/login`);
        console.log('token', token);
    }

    try {
        const decoded = jwt.verify(token.slice(7), secretKey);
        console.log('decoded', decoded);
        let models = Models.get();

        let user = await models.UserModel.findByPk(decoded.id);
        console.log('user', user);

        // if (!user || user.token !== decoded.token) {
        //     return reply.redirect(`${process.env.FRONTEND_URL}/login`);
        // }

        // // Check if the user is an admin
        // if (decoded.title !== 'admin') {
        //     return reply.redirect(`${process.env.FRONTEND_URL}/login`);
        // }

        (request as anyObject).user = decoded;
    } catch (error) {
        // return reply.redirect(`${process.env.FRONTEND_URL}/login`);
    }
};

export default check_is_admin_and_redirect;
