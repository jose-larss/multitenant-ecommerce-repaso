"use client";

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
        <div>
            Product List
            <pre>{JSON.stringify(data, null, 2)}</pre>
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