import { FastifyInstance } from 'fastify';
import ProductController from '../../controllers/product.controller';
import { CreateProductDto, UpdateProductDto } from '../../interfaces/products/product.interface';
import {
    createOpts,
    deleteOpts,
    findAllProductsOpts,
    findProductByIdOpts,
    updateOpts,
} from '../../interfaces/products/product.route-opts';

const router = async (fastify: FastifyInstance, {}) => {
    /**
     * @route GET /api/products
     */
    fastify.get('/', findAllProductsOpts, ProductController.findAllProducts);

    /**
     * @route POST /api/categories
     */
    fastify.post<{ Body: CreateProductDto }>('/', createOpts, ProductController.create);

    /**
     * @route GET /api/categories/:productId
     */
    fastify.get<{ Params: { productId: string } }>(
        '/:productId',
        findProductByIdOpts,
        ProductController.findProductById,
    );

    /**
     * @route PUT /api/categories/:productId
     */
    fastify.put<{
        Params: { productId: string };
        Body: UpdateProductDto;
    }>('/:productId', updateOpts, ProductController.update);

    /**
     * @route DELETE /api/categories/:productId
     */
    fastify.delete<{ Params: { productId: string } }>('/:productId', deleteOpts, ProductController.delete);
};

export default router;
