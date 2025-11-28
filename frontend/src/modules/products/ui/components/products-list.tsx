"use client";

import { CustomProduct } from "@/app/(home)/types";
import apiService from "@/app/services/apiServices"
import { useSuspenseQuery } from "@tanstack/react-query"

interface ProductListProps {
    category: string;
    subcategory?: string;
}

export const ProductsList = ({category, subcategory}: ProductListProps) => {
    const {data} = useSuspenseQuery({queryKey: ['products'], 
                queryFn: () => apiService.getNoCacheNoCredentials(`/products/${category}/${subcategory}/`)})

    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            {data?.map((product: CustomProduct) => (
                <div className="border rounded-md bg-white p-4" key={product.id}>
                    <h2 className="text-xl font-medium">
                        {product.name}
                    </h2>
                    <p>{product.price}</p>
                </div>
            ))}
            
        </div>
    )
}

export const ProductListSkeleton = () => {
    return(
        <div>
            Loading ...
        </div>
    )
}