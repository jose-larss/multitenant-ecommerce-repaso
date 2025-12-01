"use client";

import { CustomProduct } from "@/app/(home)/types";
import apiService from "@/app/services/apiServices"
import { useSuspenseInfiniteQuery } from "@tanstack/react-query"

import { useProductsFilters } from "../../hooks/useProductsFilterClient";
import { ProductCard } from "./product-card";
import { InboxIcon } from "lucide-react";

interface ProductListProps {
    category?: string;
    subcategory?: string;
}

export const ProductsListSubcategory = ({category, subcategory}: ProductListProps) => {
    const [filters] = useProductsFilters();
    const {data} = useSuspenseInfiniteQuery({
        queryKey: ['products', category, subcategory, filters.minPrice, filters.maxPrice, filters.tags, filters.sort], 
        queryFn: ({pageParam}) => {
            return apiService.getInfiniteQueries(pageParam)
        },
        initialPageParam: `${process.env.NEXT_PUBLIC_API_URL}/products/${category}/${subcategory}?minPrice=${filters.minPrice}&maxPrice=${filters.maxPrice}&tags=${[filters.tags]}&sort=${filters.sort}`,
        getNextPageParam: (lastPage) => {
            return lastPage.next || undefined
        }
    })

    if (data?.pages?.[0].results.length === 0) {
        return(
            <div className="border border-black border-dashed flex items-center justify-center p-8 flex-col gap-y-4 bg-white w-full rounded-lg">
                <InboxIcon />
                <p className="text-base font-medium">Ningún producto encontrado</p>
            </div>
        )
    }
  
    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            {data?.pages.map((page) => 
                page.results.map ((product: CustomProduct) => (
                    <ProductCard 
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        imageUrl={product.imagenUrl}
                        authorUsername="J. luciano"
                        authorImageUrl={undefined}
                        reviewRating={3}
                        reviewCount={5}
                        price={product.price}
                    />
                ))
            )}
        </div>
    )
}

export const ProductListSubcategorySkeleton = () => {
    return(
        <div>
            Loading ...
        </div>
    )
}