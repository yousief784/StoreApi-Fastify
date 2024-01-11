import { FastifyInstance } from 'fastify';
import CategoryController from '../../controllers/category.controller';
import {
    findAllCategoriesOpts,
    findCategoryByIdOpts,
    createOpts,
    updateOpts,
    deleteOpts,
} from '../../interfaces/categories/category.route-opts';
import { CreateCategoryDto, UpdateCategoryDto } from '../../interfaces/categories/category.interface';

const router = async (fastify: FastifyInstance, {}) => {
    /**
     * @route GET /api/categories
     */
    fastify.get('/', findAllCategoriesOpts, CategoryController.findAllCategories);

    /**
     * @route GET /api/categories/tree
     */
    fastify.get('/tree', CategoryController.findCategoriesAsTree);

    /**
     * @route POST /api/categories
     */
    fastify.post<{ Body: CreateCategoryDto }>('/', createOpts, CategoryController.create);

    /**
     * @route GET /api/categories/:categoryId
     */
    fastify.get<{ Params: { categoryId: string } }>(
        '/:categoryId',
        findCategoryByIdOpts,
        CategoryController.findCaegoryById,
    );

    /**
     * @route PUT /api/categories/:categoryId
     */
    fastify.put<{ Params: { categoryId: string }; Body: UpdateCategoryDto }>(
        '/:categoryId',
        updateOpts,
        CategoryController.update,
    );

    /**
     * @route DELETE /api/categories/:categoryId
     */
    fastify.delete<{ Params: { categoryId: string } }>('/:categoryId', deleteOpts, CategoryController.delete);
};

export default router;
