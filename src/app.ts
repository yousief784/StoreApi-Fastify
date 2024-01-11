import Fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import multipart from '@fastify/multipart';
import fastifyStatic from '@fastify/static';
import router from './routes/index.routes';
import errorHandler from './middlewares/errorHandler';
import config from './config/config';
import CheckFoldersExists from './utils/createFolders';
import path from 'path';

const app: FastifyInstance = Fastify({
    logger: true,
    bodyLimit: 30 * 1024 * 1024, // Default Limit set to 30MB
});

// handle static files in server
app.register(fastifyStatic, {
    root: path.join(__dirname, '../public'),
});

// multipart to get files in request
app.register(multipart, { attachFieldsToBody: true });

// create public folder and upload files if not created
CheckFoldersExists.createFoldersIfNotExists();

// this for testign server only
app.get('/', (_req: FastifyRequest, reply: FastifyReply) => {
    reply.code(200).send({
        statusCode: 200,
        message: 'welcome in our application',
    });
});

app.register(router, { prefix: '/api' });

// setup error handler middleware
app.setErrorHandler(errorHandler);

// start the server
(async () => {
    try {
        await app.ready();
        await app.listen({ port: config.port as number, host: config.host_address });
    } catch (error) {
        app.log.error(error);
        process.exit(1);
    }
})();
