import { FastifyInstance } from 'fastify';
import ProductController from '../../controllers/product.controller';
import { CreateProductDto, UpdateProductDto } from '../../interfaces/products/product.interface';

const router = async (fastify: FastifyInstance, {}) => {
    fastify.get('/', ProductController.findAllProducts);
    fastify.post<{ Body: CreateProductDto }>('/', ProductController.create);
    fastify.get<{ Params: { productId: string } }>('/:productId', ProductController.findProductById);
    fastify.put<{
        Params: { productId: string };
        Body: UpdateProductDto;
    }>('/:productId', ProductController.update);
    fastify.delete<{ Params: { productId: string } }>('/:productId', ProductController.delete);
};

export default router;
