import config from '../config/config';
import prisma from '../config/database';
import { INTERNAL_SERVER_ERROR, NOT_FOUND_ERROR } from '../utils/errors';
import CategoryService from './category.service';

class ProductService {
    findAllProducts = async () => {
        const products = await prisma.product.findMany({
            orderBy: {
                created_at: 'asc',
            },
            select: {
                id: true,
                name: true,
                picture: true,
                category: {
                    select: {
                        id: true,
                        name: true,
                        picture: true,
                    },
                },
            },
        });

        if (!products.length) throw new NOT_FOUND_ERROR('not found products');
        return products;
    };

    findProductById = async (productId: string) => {
        const product = await prisma.product.findFirst({
            where: {
                id: productId,
            },
            select: {
                id: true,
                name: true,
                picture: true,
                category: {
                    select: {
                        id: true,
                        name: true,
                        picture: true,
                    },
                },
            },
        });

        if (!product) throw new NOT_FOUND_ERROR('not found product with this id');

        return product;
    };

    create = async (data: { name: string; picture: string; category_id: string }) => {
        await CategoryService.isCategoryExist(data.category_id, 'not found category to set product inside it');

        const product = await prisma.product.create({
            data: {
                name: data.name,
                picture: { image_path: data.picture, url: `${config.imagesServer}/${data.picture}` },
                category_id: data.category_id,
            },
            select: {
                id: true,
                name: true,
                picture: true,
                category: {
                    select: {
                        id: true,
                        name: true,
                        picture: true,
                    },
                },
            },
        });

        return product;
    };

    update = async (
        productId: string,
        data: { name?: string; category_id?: string; picture: { url: string; path: string } | undefined },
    ) => {
        await this.isProductExist(productId);

        // check if category parent exists
        if (data.category_id) await CategoryService.isCategoryExist(data.category_id);

        const updatedCategory = await prisma.product.update({
            where: {
                id: productId,
            },
            data,
        });

        if (!updatedCategory) throw new INTERNAL_SERVER_ERROR("cant't update category try again!");

        return true;
    };

    delete = async (productId: string) => {
        await this.isProductExist(productId);

        const deleteProduct = await prisma.product.delete({
            where: {
                id: productId,
            },
        });

        if (!deleteProduct) throw new INTERNAL_SERVER_ERROR("can't delete product");

        return true;
    };

    isProductExist = async (productId: string) => {
        const product = await prisma.product.findFirst({
            where: { id: productId },
        });

        if (!product) throw new NOT_FOUND_ERROR('not found product');

        return true;
    };
}

export default new ProductService();
