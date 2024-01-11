import { RouteShorthandOptions } from 'fastify';

const categoryItem = {
    id: { type: 'string' },
    name: { type: 'string' },
    picture: {
        type: 'object',
        properties: {
            url: { type: 'string' },
        },
    },
};

export const findAllCategoriesOpts: RouteShorthandOptions = {
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
                            properties: categoryItem,
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

export const findCategoryByIdOpts: RouteShorthandOptions = {
    schema: {
        params: {
            categoryId: {
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
                        properties: {
                            ...categoryItem,
                            products: {
                                type: 'array',
                                items: {
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
                            },
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

export const createOpts: RouteShorthandOptions = {
    schema: {
        body: {
            type: 'object',
            required: ['name'],
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
                parent_id: {
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
            categoryId: {
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
                parent_id: {
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
            categoryId: {
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
