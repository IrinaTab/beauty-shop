export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    categoryId: string;
    description: string;
    propertyIds: string[];
    tagIds: string[];
}

export interface Category {
    id: string;
    name: string;
}

export interface FilterOption {
    id: string;
    name: string;
}

export interface CartItem extends Product {
    quantity: number;
}