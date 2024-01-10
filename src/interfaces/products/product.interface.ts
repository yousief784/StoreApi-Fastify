export interface ProductInterface {
    id: string;
    name: string;
    picture: string;
    category_id: string;
    created_at: Date;
    updated_at: Date;
}

export interface CreateProductDto {
    name: {
        value: string;
    };
    picture: string;
    category_id: {
        value: string;
    };
}

export interface UpdateProductDto {
    name?: {
        value: string;
    };
    picture?: string;
    category_id?: {
        value: string;
    };
}
