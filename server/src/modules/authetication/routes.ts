'use strict';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import controller from './controller';
import check_auth from './services/check_auth';
import auth_middleware from './services/auth_middleware';

module.exports = async function (fastify: FastifyInstance) {
    let prefix: string = '/auth';
    const controllerInstance = controller(fastify);

    /** public routes */
    fastify.register(
        async (route, opts) => {
            route
                .get(`/`, controllerInstance.all)
                .post(`/login`, controllerInstance.login)
                .post(`/register`, controllerInstance.register)
                .post(`/update`, controllerInstance.update)
                .post(`/forget`, controllerInstance.forget)
                .get(`/:id`, controllerInstance.find);
        },
        { prefix },
    );

    /** auth routes */
    fastify.register(
        async (route, opts) => {
            route
                // .addHook('preHandler', check_auth)
                .post(
                    `/logout`,
                    // { preHandler: auth_middleware },
                    controllerInstance.logout,
                )

                .post(
                    `/destroy`,
                    { preHandler: auth_middleware },
                    controllerInstance.destroy,
                );
        },
        { prefix },
    );
};
