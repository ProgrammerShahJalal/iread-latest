'use strict';
import { FastifyReply, FastifyRequest, FastifyInstance } from 'fastify';
import { responseObject } from '../../common_types/object';
import login from './services/login';
import register from './services/register';
import forget from './services/forget';
import auth_user from './services/auth_user';
import logout from './services/logout';
import user_profile_update from './services/user_profile_update';
import all from './services/all';
import details from './services/details';
import destroy from './services/destroy';
const { serialize, parse } = require('@fastify/cookie');

export default function (fastify: FastifyInstance) {
    return {
        all: async function (req: FastifyRequest, res: FastifyReply) {
            let data: responseObject = await all(fastify, req);
            return res
                .code(data.status)
                .header('Cache-Control', 'public, max-age=30')
                .send(data);
        },
        find: async function (req: FastifyRequest, res: FastifyReply) {
            let data = await details(fastify, req);
            res.code(data.status).send(data);
        },

        login: async function (req: FastifyRequest, res: FastifyReply) {
            let data: responseObject = await login(fastify, req);

            if (data?.data?.token) {
                console.log("==============DATA INFO =====", data.data);
                console.log("==============login token =====", data.data.token);
                res.setCookie('token', 'Bearer ' + data.data.token, {
                    path: '/',
                    httpOnly: false, // Prevents JavaScript access for security
                    // secure: process.env.NODE_ENV === 'production' ? true : false, // Must be true in production
                    sameSite: 'none', // Allows cross-origin cookie sharing
                    maxAge: 60 * 60 * 24, // 1 day expiry in seconds
                    // domain: 'localhost', // Or use your actual domain in production
                });
                
            }

            res.code(data.status).send(data);
        },

        logout: async function (req: FastifyRequest, res: FastifyReply) {
            let data: responseObject = await logout(fastify, req, res);
            console.log('logout data', data);
            res.clearCookie('token');
            res.code(data.status).send(data);
        },

        auth_user: async function (req: FastifyRequest, res: FastifyReply) {
            let data: responseObject = await auth_user(fastify, req);
            res.code(200).send(data);
        },

        register: async function (req: FastifyRequest, res: FastifyReply) {
            let data = await register(fastify, req);
            res.code(data.status).send(data);
        },
        update: async function (req: FastifyRequest, res: FastifyReply) {
            let data: responseObject = await user_profile_update(fastify, req);
            res.code(data.status).send(data);
        },

        forget: async function (req: FastifyRequest, res: FastifyReply) {
            let data: responseObject = await forget(fastify, req);
            res.code(data.status).send(data);
        },
        destroy: async function (req: FastifyRequest, res: FastifyReply) {
            let data = await destroy(fastify, req);
            res.code(data.status).send(data);
        },
    };
}
