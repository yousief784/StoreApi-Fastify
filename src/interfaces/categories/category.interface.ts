import { ProductInterface } from "../products/product.interface";

export interface CategoryInterface {
    id: string;
    name: string;
    picture: {
        url: string;
        path: string;
    };
    parent_id?: string;
    products: ProductInterface[];
    created_at: Date;
    updated_at: Date;
}

export interface CreateCategoryDto {
    name: {
        value: string;
    };
    picture: string;
    parent_id?: {
        value: string;
    };
}

export interface UpdateCategoryDto {
    name?: {
        value: string;
    };
    picture?: string;
    parent_id?: {
        value: string;
    };
}

export interface TreeNode {
    id: string;
    name: string;
    children?: TreeNode[];
}

export interface TreeData {
    id: string;
    name: string;
    parent_id: string | null;
    level: number;
}
