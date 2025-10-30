import Link from "next/link";

interface Category {
    id: string;
    name: string;
    slug: string;
    color: string;
    created_at: string;
    updated_at: string;
    subcategorias: Category[]; // relaccion recursiva (subcategorias)
}

interface SubcategoryMenuProps {
    category: Category;
    isOpen: boolean;
    position: {top: number, left:number}
}

export const SubcategoryMenu = ({category, isOpen, position}: SubcategoryMenuProps) => {
    if (!isOpen || !category.subcategorias || category.subcategorias?.length === 0) {
        return null;
    }

    const backgroundColor = category.color || "F5F5F5"

    return(
        <div className="fixed z-100" style={{top: position.top, left: position.left}}>
            {/* Invisible bridge to maintein hover */}
            <div className="h-3 w-60" />
            <div    
                style={{backgroundColor}} 
                className="w-60 text-black rounded-md overflow-hidden border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                -translate-x-0,5 -translate-y-0,5"
            >
                <div className="">
                    {category.subcategorias?.map((subcategoria: Category) => (
                        <Link
                            href={"/"}
                            key={subcategoria.slug}
                            className="w-full text-left p-4 hover:bg-black hover:text-white flex justify-between 
                            items-center underline font-medium"
                        >
                            {subcategoria.name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}