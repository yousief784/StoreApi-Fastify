import { FastifyReply, FastifyRequest } from 'fastify';
import { APP_ERROR } from '../utils/errors';
import config from '../config/config';

// reply object if error exist in development mode
const sendDevelopmentError = (
    err: {
        message: string;
        statusCode: number;
        stack: string | undefined;
        error: APP_ERROR;
    },
    reply: FastifyReply,
) => {
    reply.code(err.statusCode).send({
        statusCode: err.statusCode,
        message: err.message,
        stack: err.stack,
        error: err,
    });
};

// reply object if error exist in production mode
const sendProductionError = (
    err: {
        message: string;
        statusCode: number;
        stack: string | undefined;
        error: APP_ERROR;
    },
    reply: FastifyReply,
) => {
    reply.code(err.statusCode).send({
        statusCode: err.statusCode,
        message: err.message,
    });
};

const errorHandler = async (err: APP_ERROR, _req: FastifyRequest, reply: FastifyReply) => {
    const errObj = {
        message: err.message || 'Something went wrong',
        statusCode: 500,
        stack: err.stack,
        error: err,
    };

    if (err) {
        errObj.message = err.message;
        errObj.statusCode = err.statusCode || 500;
    }

    if (config.env === 'development') sendDevelopmentError(errObj, reply);
    if (config.env === 'production') sendProductionError(errObj, reply);
};

export default errorHandler;
