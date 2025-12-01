"use client";

import { CustomProduct } from "@/app/(home)/types";
import apiService from "@/app/services/apiServices"
import { useSuspenseInfiniteQuery } from "@tanstack/react-query"

import { useProductsFilters } from "../../hooks/useProductsFilterClient";
import { ProductCard, ProductCardSkeleton } from "./product-card";
import { DEFAULT_LIMIT_PAGINATION } from "../../../../../constants";
import { Button } from "@/components/ui/button";
import { InboxIcon } from "lucide-react";

interface ProductListProps {
    category?: string;
}

export const ProductsListCategory = ({category}: ProductListProps) => {
    const [filters] = useProductsFilters();
    const {data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage} = useSuspenseInfiniteQuery({
        queryKey: ['products', category, filters.minPrice, filters.maxPrice, filters.tags, filters.sort], 
        queryFn: ({pageParam}) => {
            return apiService.getInfiniteQueries(pageParam)
        },
        initialPageParam: `${process.env.NEXT_PUBLIC_API_URL}/products/${category}?minPrice=${filters.minPrice}&maxPrice=${filters.maxPrice}&tags=${[filters.tags]}&sort=${filters.sort}&limit=${DEFAULT_LIMIT_PAGINATION}`,
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
        <>
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

            <div className="flex justify-center pt-8">
                {hasNextPage && (
                    <Button
                        disabled={isFetchingNextPage}
                        onClick={() => fetchNextPage()}
                        className="font-medium disabled:opacity-50 text-base bg-white"
                        variant={"elevated"}
                    >
                        Cargar más...
                    </Button>
                )}
            </div>
        </>
    )
}

export const ProductListCategorySkeleton = () => {
    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            {Array.from({length: DEFAULT_LIMIT_PAGINATION}).map((_, index) => (
                <ProductCardSkeleton key={index}/>
            ))}
        </div>
    )
}