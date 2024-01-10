import { RouteShorthandOptions } from 'fastify';

export const getAllCategoriesSchema: RouteShorthandOptions = {
    schema: {
        querystring: {
            properties: {
                page: { type: 'integer' },
                limit: { type: 'integer' },
            },
        },
        response: {
            200: {
                type: 'object',
            },
            404: {
                type: 'object',
            },
        },
    },
};

export const createNewCategorySchema: RouteShorthandOptions = {
    schema: {
        response: {
            201: {
                type: 'object',
                properties: {
                    statusCode: { type: 'integer' },
                    data: null,
                    message: { type: 'string' },
                },
            },
        },
    },
};
