import Fastify, { FastifyInstance } from 'fastify';
import multipart from '@fastify/multipart';
import fastifyStatic from '@fastify/static';
import router from './routes/index.routes';
import errorHandler from './middlewares/errorHandler';
import config from './config/config';
import CheckFoldersExists from './utils/createFolders';
import path from 'path';

const app: FastifyInstance = Fastify({
    logger: true,
});

// handle static files in server
app.register(fastifyStatic, {
    root: path.join(__dirname, '../public'),
});

// multipart to get files in request
app.register(multipart, { attachFieldsToBody: true });

// create public folder and upload files if not created
CheckFoldersExists.createFoldersIfNotExists();

app.register(router, { prefix: '/api' });

// setup error handler middleware
app.setErrorHandler(errorHandler);

// start the server
(async () => {
    try {
        await app.ready();
        await app.listen({ port: config.port as number });
    } catch (error) {
        app.log.error(error);
        process.exit(1);
    }
})();
