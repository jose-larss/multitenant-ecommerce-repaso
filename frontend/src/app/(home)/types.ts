export interface CustomCategory {
    id: string;
    name: string;
    slug: string;
    color: string;
    created_at: string;
    updated_at: string;
    subcategorias: CustomCategory[]; // relaccion recursiva (subcategorias)
}

export interface CustomProduct {
    id: string;
    name: string;
    slug: string; 
    description: string; 
    price: number; 
    imagenUrl: string,
    refundpolicy: string; 
    created_at: string; 
    updated_at: string;
    category: CustomCategory;
    subcategory: CustomCategory;
}

export interface CustomTags {
    id: string;
    name: string;   
    created_at: string; 
    updated_at: string;
}