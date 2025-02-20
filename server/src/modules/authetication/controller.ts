'use strict';
import { FastifyReply, FastifyRequest, FastifyInstance } from 'fastify';
import { responseObject } from '../../common_types/object';
import login from './services/login';
import register from './services/register';
import forget from './services/forget';
import auth_user from './services/auth_user';
import logout from './services/logout';
import parent_login from './services/parent_login';
import student_login from './services/student_login';
import user_profile_update from './services/user_profile_update';
import update_user_role from './services/update_user_role';
import all from './services/all';
import user_detils from './services/details';
import { send } from 'process';
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

            const cookie = serialize('token', 'Bearer ' + data.data.token, {
                maxAge: 60_000,
            });

            res.header('Set-Cookie', cookie);
            res.code(data.status).send(data);
        },

        parent_login: async function (req: FastifyRequest, res: FastifyReply) {
            let data: responseObject = await parent_login(fastify, req);
            const cookie = serialize('token', 'Bearer ' + data.data.token, {
                maxAge: 172800,
                path: '/',
                httpOnly: false,
                sameSite: 'lax',
            });

            res.header('Set-Cookie', cookie);
            // res.header('Set-Cookie', cookie2);
            res.code(data.status).send(data);
        },

        student_login: async function (req: FastifyRequest, res: FastifyReply) {
            let data: responseObject = await student_login(fastify, req);
            const cookie = serialize('token', 'Bearer ' + data.data.token, {
                maxAge: 172800,
                path: '/',
                httpOnly: false,
                sameSite: 'lax',
            });

            res.header('Set-Cookie', cookie);
            // res.header('Set-Cookie', cookie2);
            res.code(data.status).send(data);
        },


        logout: async function (req: FastifyRequest, res: FastifyReply) {
            let data: responseObject = await logout(fastify, req);
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
        role_update: async function (req: FastifyRequest, res: FastifyReply) {
            let data: responseObject = await update_user_role(fastify, req);
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
