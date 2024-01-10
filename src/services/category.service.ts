import prisma from '../config/database';
import { INTERNAL_SERVER_ERROR, NOT_FOUND_ERROR } from '../utils/errors';
import config from '../config/config';
import { Prisma } from '@prisma/client';
import { CategoryInterface, TreeData, TreeNode } from '../interfaces/categories/category.interface';

class CategoryService {
    findAllCategories = async () => {
        const categories = await prisma.category.findMany({
            orderBy: {
                created_at: 'asc',
            },
            select: {
                id: true,
                name: true,
                picture: true,
                children: {
                    select: {
                        id: true,
                        name: true,
                        picture: true,
                    },
                },
            },
        });

        if (!categories.length) throw new NOT_FOUND_ERROR('not found categories');

        return categories;
    };

    findCategoryById = async (categoryId: string) => {
        const category = await prisma.category.findFirst({
            where: {
                id: categoryId,
            },
            select: {
                id: true,
                name: true,
                picture: true,
                products: true,
            },
        });

        if (!category) throw new NOT_FOUND_ERROR('not found category with this id');

        return category;
    };

    findCategoriesAsTree = async () => {
        try {
            const categories: TreeData[] = await prisma.$queryRaw`
                    WITH RECURSIVE categoryCte AS (
                        SELECT id, parent_id, name, picture,'1' AS level
                        FROM Category
                        WHERE parent_id IS NULL
                        UNION ALL
                        SELECT cat.id, cat.parent_id, cat.name, cat.picture, catCte.level + 1
                        FROM Category cat
                        JOIN categoryCte catCte ON cat.parent_id = catCte.id
                        )
                    
                    SELECT * FROM categoryCte ORDER BY level`;

            if (!categories) throw new NOT_FOUND_ERROR('not found categories');

            const categoryTree = this.buildTree(categories);

            return categoryTree;
        } catch (error) {
            console.log('err', error);
        }
    };

    create = async (data: { name: string; picture: string; parent_id?: string }): Promise<Boolean> => {
        const category = await prisma.category.create({
            data: {
                name: data.name,
                picture: { path: data.picture, url: `${config.imagesServer}/${data.picture}` },
                parent_id: data.parent_id,
            },
        });

        if (!category) throw new INTERNAL_SERVER_ERROR(`Can't create category`);

        return true;
    };

    update = async (
        categoryId: string,
        data: { name?: string; parent_id?: string; picture: { url: string; path: string } | undefined },
    ) => {
        // check iff category in params is already exist
        await this.isCategoryExist(categoryId);

        // check if category parent exists
        if (data.parent_id) await this.isCategoryExist(data.parent_id);

        const category = await prisma.category.update({
            where: {
                id: categoryId,
            },
            data,
        });

        if (!category) throw new INTERNAL_SERVER_ERROR(`Cant't update category`);
        return true;
    };

    delete = async (categoryId: string) => {
        await this.isCategoryExist(categoryId);

        const deleteCategory = await prisma.category.delete({
            where: {
                id: categoryId,
            },
        });

        if (!deleteCategory) throw new INTERNAL_SERVER_ERROR("can't delete category");

        return true;
    };

    isCategoryExist = async (categoryId: string, message: string = 'not found category') => {
        const category = await prisma.category.findFirst({
            where: { id: categoryId },
        });

        if (!category) throw new NOT_FOUND_ERROR(message);

        return true;
    };

    buildTree = (categories: TreeData[]): TreeNode[] => {
        const tree: TreeNode[] = [];

        const findChildren = (parentId: string | null, level: number): TreeNode[] => {
            const children: TreeNode[] = [];

            categories.forEach((category: TreeData) => {
                if (category.parent_id === parentId && +category.level === level) {
                    const childNode: TreeNode = {
                        id: category.id,
                        name: category.name,
                    };

                    const grandchildren = findChildren(category.id, level + 1);
                    if (grandchildren.length > 0) {
                        childNode.children = grandchildren;
                    }

                    children.push(childNode);
                }
            });

            return children;
        };

        const topLevelNodes = findChildren(null, 1);
        tree.push(...topLevelNodes);

        return tree;
    };
}

export default new CategoryService();
