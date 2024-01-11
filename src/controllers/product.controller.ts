import { FastifyRequest, FastifyReply } from 'fastify';
import ProductService from '../services/product.service';
import uploadPicture from '../utils/uploadFile';
import { FOLDERS_NAME } from '../utils/enums';
import { CreateProductDto, UpdateProductDto } from '../interfaces/products/product.interface';
import { BAD_REQUEST_ERROR } from '../utils/errors';
import config from '../config/config';

class ProductController {
    /**
     * @route GET /api/products
     */
    findAllProducts = async (req: FastifyRequest, reply: FastifyReply) => {
        const products = await ProductService.findAllProducts();
        reply.code(200).send({
            statusCode: 200,
            data: products,
            message: 'get all products',
        });
    };

    /**
     * @route GET /api/products/:productId
     * @required :productId in params
     */
    findProductById = async (req: FastifyRequest<{ Params: { productId: string } }>, reply: FastifyReply) => {
        const product = await ProductService.findProductById(req.params.productId);

        reply.code(200).send({
            statusCode: 200,
            data: product,
            message: 'find product successfully',
        });
    };

    /**
     * @route POST /api/products
     * @required [name, picture, category_id] in boyd multipart/form-data
     */
    create = async (req: FastifyRequest<{ Body: CreateProductDto }>, reply: FastifyReply) => {
        const data = req.body;

        // validion picture error
        if (!data.picture) throw new BAD_REQUEST_ERROR(`body must have required property 'picture'`);

        // uplad, crop picture and return with picture path
        const picturePath = await uploadPicture(data, FOLDERS_NAME.PRODUCTS_PICTURES);

        await ProductService.create({
            name: data.name.value,
            category_id: data.category_id.value,
            picture: picturePath,
        });

        reply.code(201).send({
            statusCode: 201,
            data: null,
            message: 'Product created successfully',
        });
    };

    /**
     * @route PUT /api/products/:productId
     * @requied :productId in params
     * @optional [name, picture, category_id] in boyd multipart/form-data
     */
    update = async (
        req: FastifyRequest<{
            Params: { productId: string };
            Body: UpdateProductDto;
        }>,
        reply: FastifyReply,
    ) => {
        const data = req.body;

        // check if picture in body to upload it
        let picture: string | undefined;
        if (req.body.picture) picture = await uploadPicture(data, FOLDERS_NAME.PRODUCTS_PICTURES);

        // update in service
        await ProductService.update(req.params.productId, {
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
            data: null,
            message: 'product updated successfully',
        });
    };

    /**
     * @route DELETE /api/products/:productId
     * @requied :productId in params
     */
    delete = async (req: FastifyRequest<{ Params: { productId: string } }>, reply: FastifyReply) => {
        await ProductService.delete(req.params.productId);

        reply.code(204);
    };
}

export default new ProductController();
