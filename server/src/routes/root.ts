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
        .get(
            '/about',
            async (_req: FastifyRequest, reply: FastifyReply) => {
                return reply.status(200).view("auth/login.ejs");
            },
        )
        ;
};
