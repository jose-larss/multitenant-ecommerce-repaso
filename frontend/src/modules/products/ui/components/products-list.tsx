"use client";

import { CustomProduct } from "@/app/(home)/types";
import apiService from "@/app/services/apiServices"
import { useSuspenseInfiniteQuery } from "@tanstack/react-query"

import { useProductsFilters } from "../../hooks/useProductsFilterClient";
import { ProductCard, ProductCardSkeleton } from "./product-card";
import { DEFAULT_LIMIT_PAGINATION } from "../../../../../constants";
import { Button } from "@/components/ui/button";
import { InboxIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductListProps {
    category?: string;
    subcategory?: string;
    tenant?: string;
    //para que se vea menos delgada la card del tenant
    narrowView?: boolean;
}

export const ProductsList = ({category, subcategory, tenant, narrowView}: ProductListProps) => {
    const [filters] = useProductsFilters();

    let params = `${process.env.NEXT_PUBLIC_API_URL}/products?minPrice=${filters.minPrice}&maxPrice=${filters.maxPrice}&tags=${[filters.tags]}&sort=${filters.sort}`
    let queryKeys: any = ['products', filters.minPrice, filters.maxPrice, filters.tags, filters.sort]

    if (subcategory !== undefined && category !== undefined) {
        params = `${process.env.NEXT_PUBLIC_API_URL}/products/${category}/${subcategory}?minPrice=${filters.minPrice}&maxPrice=${filters.maxPrice}&tags=${[filters.tags]}&sort=${filters.sort}`
        queryKeys = ['products', category, subcategory, filters.minPrice, filters.maxPrice, filters.tags, filters.sort]

    } else if (category !== undefined){
        params = `${process.env.NEXT_PUBLIC_API_URL}/products/${category}?minPrice=${filters.minPrice}&maxPrice=${filters.maxPrice}&tags=${[filters.tags]}&sort=${filters.sort}`
        queryKeys = ['products', category, filters.minPrice, filters.maxPrice, filters.tags, filters.sort]

    } else  if(tenant !== undefined) {
        params = `${process.env.NEXT_PUBLIC_API_URL}/products/${tenant}?minPrice=${filters.minPrice}&maxPrice=${filters.maxPrice}&tags=${[filters.tags]}&sort=${filters.sort}`
        queryKeys = ['products', tenant, filters.minPrice, filters.maxPrice, filters.tags, filters.sort]
    }
    
    
    const {data,isLoading,hasNextPage,isFetchingNextPage,fetchNextPage,} = useSuspenseInfiniteQuery({
        queryKey: queryKeys ,
        queryFn: ({ pageParam }) => apiService.getInfiniteQueries(pageParam),
        initialPageParam: params,
        getNextPageParam: (lastPage) => lastPage.next || undefined,
        //enabled: !!category,  // siempre al menos categoría
    });
  
    
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
            <div className={cn(
                "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4",
                narrowView && "lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3"
            )}>        
                {data?.pages.map((page) => 
                    page.results.map ((product: CustomProduct) => (            
                        <ProductCard 
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            imagen={product?.imagen}
                            tenantSlug={product.tenant?.slug}
                            tenantImageUrl={product.tenant?.imagen}
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

export const ProductListSkeleton = ({narrowView}: ProductListProps) => {
    return(
        <div className={cn (
                "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4",
                narrowView && "lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3"
            )}>
            {Array.from({length: DEFAULT_LIMIT_PAGINATION}).map((_, index) => (
                <ProductCardSkeleton key={index}/>
            ))}
        </div>
    )
}