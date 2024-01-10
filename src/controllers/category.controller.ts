import { FastifyRequest, FastifyReply } from 'fastify';
import CategoryService from '../services/category.service';
import { CreateCategoryDto, UpdateCategoryDto } from '../interfaces/categories/category.interface';
import uploadPicture from '../utils/uploadFile';
import { FOLDERS_NAME } from '../utils/enums';
import config from '../config/config';
import { BAD_REQUEST_ERROR } from '../utils/errors';

class CategoryController {
    findAllCategories = async (req: FastifyRequest, reply: FastifyReply) => {
        const categories = await CategoryService.findAllCategories();
        reply.code(200).send({
            statusCode: 200,
            data: categories,
            message: 'get all categories',
        });
    };

    findCaegoryById = async (req: FastifyRequest<{ Params: { categoryId: string } }>, reply: FastifyReply) => {
        const category = await CategoryService.findCategoryById(req.params.categoryId);

        reply.code(200).send({
            statusCode: 200,
            data: category,
            message: '',
        });
    };

    findCategoriesAsTree = async (req: FastifyRequest, reply: FastifyReply) => {
        const categories = await CategoryService.findCategoriesAsTree();

        reply.code(200).send({
            statusCode: 200,
            data: categories,
            message: 'get categories as tree',
        });
    };

    create = async (req: FastifyRequest<{ Body: CreateCategoryDto }>, reply: FastifyReply) => {
        const data = req.body;

        // uplad, crop picture and return with picture path
        const picturePath = await uploadPicture(data, FOLDERS_NAME.CATEGORIES_PICTURES);

        await CategoryService.create({
            name: data.name.value,
            parent_id: data.parent_id && data.parent_id.value,
            picture: picturePath,
        });

        reply.code(201).send({
            statusCode: 201,
            data: null,
            message: 'Category created successfully',
        });
    };

    update = async (
        req: FastifyRequest<{
            Params: { categoryId: string };
            Body: UpdateCategoryDto;
        }>,
        reply: FastifyReply,
    ) => {
        const data = req.body;
        // validation error
        if (!(data && req.params.categoryId)) throw new BAD_REQUEST_ERROR('no body in request to update');

        // check if picture in body to upload it
        let picturePath: string | undefined;

        if (req.body.picture) {
            picturePath = await uploadPicture(data, FOLDERS_NAME.CATEGORIES_PICTURES);
        }

        // update in service
        await CategoryService.update(req.params.categoryId, {
            name: data.name?.value,
            parent_id: data.parent_id?.value,
            picture: picturePath
                ? {
                      url: `${config.imagesServer}/${picturePath}`,
                      path: picturePath,
                  }
                : undefined,
        });

        reply.code(200).send({
            statusCode: 200,
            data: null,
            message: 'category updated successfully',
        });
    };

    delete = async (req: FastifyRequest<{ Params: { categoryId: string } }>, reply: FastifyReply) => {
        await CategoryService.delete(req.params.categoryId);

        reply.code(204);
    };
}

export default new CategoryController();
