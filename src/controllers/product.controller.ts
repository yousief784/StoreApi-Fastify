import { FastifyRequest, FastifyReply } from 'fastify';
import ProductService from '../services/product.service';
import uploadPicture from '../utils/uploadFile';
import { FOLDERS_NAME } from '../utils/enums';
import { CreateProductDto, UpdateProductDto } from '../interfaces/products/product.interface';
import { BAD_REQUEST_ERROR } from '../utils/errors';
import config from '../config/config';

class ProductController {
    findAllProducts = async (req: FastifyRequest, reply: FastifyReply) => {
        const products = await ProductService.findAllProducts();
        reply.code(200).send({
            statusCode: 200,
            data: products,
            message: 'get all products',
        });
    };

    findProductById = async (req: FastifyRequest<{ Params: { productId: string } }>, reply: FastifyReply) => {
        const product = await ProductService.findProductById(req.params.productId);

        reply.code(200).send({
            statusCode: 200,
            data: product,
            message: 'find product successfully',
        });
    };

    create = async (req: FastifyRequest<{ Body: CreateProductDto }>, reply: FastifyReply) => {
        const data = req.body;
        if (!(data.name && data.category_id && data.picture)) throw new BAD_REQUEST_ERROR('no product data to create');
        const picturePath = await uploadPicture(data, FOLDERS_NAME.PRODUCTS_PICTURES);
        const createNewProduct = await ProductService.create({
            name: data.name.value,
            category_id: data.category_id.value,
            picture: picturePath,
        });
        reply.code(201).send({
            statusCode: 201,
            data: createNewProduct,
            message: 'Product created successfully',
        });
    };

    update = async (
        req: FastifyRequest<{
            Params: { productId: string };
            Body: UpdateProductDto;
        }>,
        reply: FastifyReply,
    ) => {
        const data = req.body;
        // validation error
        if (!(data && req.params.productId)) throw new BAD_REQUEST_ERROR('no body in request to update');

        // check if picture in body to upload it
        let picture: string | undefined;
        if (req.body.picture) {
            picture = await uploadPicture(data, FOLDERS_NAME.PRODUCTS_PICTURES);
        }

        // update in service
        const updateProduct = await ProductService.update(req.params.productId, {
            name: data.name?.value,
            category_id: data.category_id?.value,
            picture: picture
                ? {
                      url: `${config.imagesServer}/${picture}`,
                      path: picture,
                  }
                : undefined,
        });

        reply.code(200).send({
            statusCode: 200,
            data: updateProduct,
            message: 'product updated successfully',
        });
    };

    delete = async (req: FastifyRequest<{ Params: { productId: string } }>, reply: FastifyReply) => {
        await ProductService.delete(req.params.productId);

        reply.code(204);
    };
}

export default new ProductController();
