import { Categories } from "./categories";
import { SearchInput } from "./search-input";

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

export const SearchFilters = ({data}: Props) => {
    return(
        <div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full">
            <SearchInput />
            <Categories data={data}/>
        </div>
    )
}