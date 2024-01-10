import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import categoryRouter from './category/index.routes';
import productRouter from './product/index.routes';

const router = async (fastify: FastifyInstance, {}) => {
    fastify.get('/', (req: FastifyRequest, reply:FastifyReply) => {
        reply.code(200).send({
            statusCode: 200,
            message: 'welcome in our application'
        })
    })
    fastify.register(categoryRouter, { prefix: '/categories' });
    fastify.register(productRouter, { prefix: '/products' });
};

export default router;
