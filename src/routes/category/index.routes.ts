import { FastifyInstance } from 'fastify';
import CategoryController from '../../controllers/category.controller';
import { createNewCategorySchema } from '../../interfaces/categories/category.schema';
import { CreateCategoryDto, UpdateCategoryDto } from '../../interfaces/categories/category.interface';

const router = async (fastify: FastifyInstance, {}) => {
    /**
     * @route GET /api/categories
     */
    fastify.get('/', CategoryController.findAllCategories);

    /**
     * @route GET /api/categories/tree
     */
    fastify.get('/tree', CategoryController.findCategoriesAsTree);

    /**
     * @route POST /api/categories
     */
    fastify.post<{ Body: CreateCategoryDto }>('/', CategoryController.create);

    fastify.get<{ Params: { categoryId: string } }>('/:categoryId', CategoryController.findCaegoryById);

    fastify.put<{ Params: { categoryId: string }; Body: UpdateCategoryDto }>('/:categoryId', CategoryController.update);

    fastify.delete<{ Params: { categoryId: string } }>('/:categoryId', CategoryController.delete);
};

export default router;
