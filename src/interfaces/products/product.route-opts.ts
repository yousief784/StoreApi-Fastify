import { RouteShorthandOptions } from 'fastify';

const productItem = {
    id: { type: 'string' },
    name: { type: 'string' },
    picture: {
        type: 'object',
        properties: {
            url: { type: 'string' },
        },
    },
    category: {
        type: 'object',
        properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            picture: {
                type: 'object',
                properties: {
                    url: { type: 'string' },
                },
            },
        },
    },
};

export const findAllProductsOpts: RouteShorthandOptions = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    statusCode: { type: 'integer' },
                    data: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: productItem,
                        },
                    },
                    message: { type: 'string' },
                },
            },
            404: {
                type: 'object',
                properties: {
                    statusCode: { type: 'integer' },
                    message: { type: 'string' },
                },
            },
        },
    },
};

export const findProductByIdOpts: RouteShorthandOptions = {
    schema: {
        params: {
            productId: {
                type: 'string',
            },
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    statusCode: { type: 'integer' },
                    data: {
                        type: 'object',
                        properties: productItem,
                    },
                    message: { type: 'string' },
                },
            },
            404: {
                type: 'object',
                properties: {
                    statusCode: { type: 'integer' },
                    message: { type: 'string' },
                },
            },
        },
    },
};

export const createOpts: RouteShorthandOptions = {
    schema: {
        body: {
            type: 'object',
            required: ['name', 'category_id'],
            properties: {
                name: {
                    type: 'object',
                    properties: {
                        value: { type: 'string' },
                    },
                },
                picture: {
                    type: 'object',
                },
                category_id: {
                    type: 'object',
                    properties: {
                        value: { type: 'string' },
                    },
                },
            },
        },
        response: {
            201: {
                type: 'object',
                properties: {
                    statusCode: { type: 'integer' },
                    data: { type: 'null' },
                    message: { type: 'string' },
                },
            },

            400: {
                type: 'object',
                properties: {
                    statusCode: { type: 'integer' },
                    message: { type: 'string' },
                },
            },
        },
    },
};

export const updateOpts: RouteShorthandOptions = {
    schema: {
        params: {
            productId: {
                type: 'string',
            },
        },

        body: {
            type: 'object',
            properties: {
                name: {
                    type: 'object',
                    properties: {
                        value: { type: 'string' },
                    },
                },
                picture: {
                    type: 'object',
                },
                category_id: {
                    type: 'object',
                    properties: {
                        value: { type: 'string' },
                    },
                },
            },
        },

        response: {
            200: {
                type: 'object',
                properties: {
                    statusCode: { type: 'integer' },
                    data: { type: 'null' },
                    message: { type: 'string' },
                },
            },
            400: {
                type: 'object',
                properties: {
                    statusCode: { type: 'integer' },
                    message: { type: 'string' },
                },
            },
            404: {
                type: 'object',
                properties: {
                    statusCode: { type: 'integer' },
                    message: { type: 'string' },
                },
            },
        },
    },
};

export const deleteOpts: RouteShorthandOptions = {
    schema: {
        params: {
            productId: {
                type: 'string',
            },
        },

        response: {
            204: {},
            404: {
                type: 'object',
                properties: {
                    statusCode: { type: 'integer' },
                    message: { type: 'string' },
                },
            },
        },
    },
};
