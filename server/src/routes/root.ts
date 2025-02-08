'use strict';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
module.exports = async function (fastify: FastifyInstance) {
    fastify
        .get(
            '/',
            async (_req: FastifyRequest, reply: FastifyReply) => {
                return reply.status(200).send({});
            },
        )

        .get('/login', async (_req: FastifyRequest, reply: FastifyReply) => {
            return reply.view('auth/super_admin_login.ejs');
        })


        .get('/login', async (_req: FastifyRequest, reply: FastifyReply) => {
            // return reply.view('website/pages/login.ejs');
            return reply.view('auth/super_admin_login.ejs');
        })

        .get(
            '/super-admin',
            // { preHandler: check_is_admin_and_redirect },
            async (_req: FastifyRequest, reply: FastifyReply) => {
                return reply.view('dashboard/super_admin_uni.ejs');
            },
        )

        .get(
            '/admin',
            // { preHandler: check_is_admin_and_redirect },
            async (_req: FastifyRequest, reply: FastifyReply) => {
                return reply.view('dashboard/admin.ejs');
            },
        )
        .get(
            '/super-admin/login',
            async (_req: FastifyRequest, reply: FastifyReply) => {
                return reply.view('auth/super_admin_login.ejs');
            },
        )
        .get(
            '/student',
            // { preHandler: check_auth_and_redirect },
            // { preHandler: check_student_auth },
            async (_req: FastifyRequest, reply: FastifyReply) => {
                return reply.view('dashboard/student_uni.ejs');
            },
        )
        .get(
            '/student/login',
            // { preHandler: check_auth_and_redirect },
            async (_req: FastifyRequest, reply: FastifyReply) => {
                return reply.view('auth/student_login.ejs');
            },
        )
        .get(
            '/parent',
            // { preHandler: check_auth_and_redirect },
            // { preHandler: check_parent_auth },
            async (_req: FastifyRequest, reply: FastifyReply) => {
                return reply.view('dashboard/parent_uni.ejs');
            },
        )
        .get(
            '/parent/login',
            // { preHandler: check_auth_and_redirect },
            async (_req: FastifyRequest, reply: FastifyReply) => {
                return reply.view('auth/parent_login.ejs');
            },
        )
        ;
};
