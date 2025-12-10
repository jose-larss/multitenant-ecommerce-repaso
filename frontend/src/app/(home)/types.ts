export interface CustomCategory {
    id: string;
    name: string;
    slug: string;
    color: string;
    created_at: string;
    updated_at: string;
    subcategorias: CustomCategory[]; // relaccion recursiva (subcategorias)
}

export interface CustomTenant {
    id: string;
    name: string;
    slug: string;
    imagen: string, 
    stripeAccountId: string;
    stripeDetailsSubmitted: string;
    created_at: string; 
    updated_at: string;
}

export interface CustomProduct {
    id: string;
    name: string;
    slug: string; 
    imagen: string;
    description: string; 
    price: number; 
    imagenUrl: string,
    refundpolicy: string; 
    created_at: string; 
    updated_at: string;
    category: CustomCategory;
    subcategory: CustomCategory;
    tenant: CustomTenant;
}

export interface CustomTags {
    id: string;
    name: string;   
    created_at: string; 
    updated_at: string;
}