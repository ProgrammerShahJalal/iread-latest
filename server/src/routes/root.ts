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
            '/admin',
            async (_req: FastifyRequest, reply: FastifyReply) => {
                return reply.status(200).view("dashboard/admin.ejs");
            },
        )
        ;
};
