"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { Categories } from "./categories";
import { SearchInput } from "./search-input";
import apiService from "@/app/services/apiServices";
import { useParams } from "next/navigation";
import { DEFAULT_BG_COLOR } from "@/modules/home/constants";
import { CustomCategory } from "@/app/(home)/types";
import { BreadCrumbNavigation } from "./breadcrumb-navigation";


export const SearchFilters = () => {
    const params = useParams()
    const {data} = useSuspenseQuery({queryKey: ['categories'], queryFn: () => apiService.getNoCacheNoCredentials("/categories/"),})

    const categoryParam = params.category as string || undefined;
    const activeCategory = categoryParam || "all";

    const activeCategoryData = data.find((category: CustomCategory) => category.slug === activeCategory);

    const activeCategoryColor = activeCategoryData?.color || DEFAULT_BG_COLOR
    const activeCategoryName = activeCategoryData?.name || null

    const activeSubcategory = params.subcategory as string || undefined;
    //tiene que buscar la subcategoria a traves de activeCategoryDate
    const activeSubcategoryName = activeCategoryData?.subcategorias?.find(
        (subcategory: CustomCategory) => subcategory.slug === activeSubcategory
    )?.name || null
   
    return(
        <div
            style={{backgroundColor: activeCategoryColor}} 
            className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full"
        >
            <SearchInput />
            <div className="hidden lg:block">
                <Categories data={data}/>
            </div>

            <BreadCrumbNavigation 
                activeCategoryName={activeCategoryName}
                activeSubcategoryName={activeSubcategoryName}
                activeCategory={activeCategory}
            />
        </div>
    )
}

export const SearchFiltersSkeleton = () => {
    return(
        <div 
            className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full"
            style={{backgroundColor: "#F5F5F5"}}
        >
            <SearchInput disabled/>
            <div className="hidden lg:block">
                <div className="h-11"/>
            </div>
        </div>
    )
}