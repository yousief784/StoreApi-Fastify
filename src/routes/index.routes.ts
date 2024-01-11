import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import categoryRouter from './category/index.routes';
import productRouter from './product/index.routes';

const router = async (fastify: FastifyInstance, {}) => {
    /**
     * @route /api
     */
    fastify.register(categoryRouter, { prefix: '/categories' });

    /**
     * @route /api
     */
    fastify.register(productRouter, { prefix: '/products' });
};

export default router;
