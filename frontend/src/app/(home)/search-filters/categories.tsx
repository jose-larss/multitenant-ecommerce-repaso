import { CategoryDropDown } from "./category-dropdown";

interface Category {
    id: string;
    name: string;
    slug: string;
    color: string;
    created_at: string;
    updated_at: string;
    subcategorias: Category[]; // relaccion recursiva (subcategorias)
}

interface Props {
    data: Category[];
}

export const Categories = ({data}: Props) => {
    return(
        <div className="relative w-full">
            <div className="flex flex-nowrap items-center">
                {data.map((category) => (
                    <div key={category.id}>
                        <CategoryDropDown 
                            category={category}
                            isActive={false}
                            isNavigationHovered={false}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}