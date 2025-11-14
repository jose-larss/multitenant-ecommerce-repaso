export interface CustomCategory {
    id: string;
    name: string;
    slug: string;
    color: string;
    created_at: string;
    updated_at: string;
    subcategorias: CustomCategory[]; // relaccion recursiva (subcategorias)
}