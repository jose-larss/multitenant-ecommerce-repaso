import { getQueryClient } from "@/app/query-client"
import apiService from "@/app/services/apiServices"

import { dehydrate, HydrationBoundary } from "@tanstack/react-query"

import type { SearchParams } from "nuqs/server"
import { loadProductFilters } from "@/modules/products/hooks/useProductsFilterServer"

import { ProductListViewCategory } from "@/modules/products/views/product-list-view-category"
import { DEFAULT_LIMIT_PAGINATION } from "../../../../constants"


interface Props {
    params: Promise<{
        category: string,
        subcategory?: string,
    }>;
    searchParams: Promise<SearchParams>;
}

const Page = async ({params, searchParams}: Props) => {
    const {category} = await params
    const filters = await loadProductFilters(searchParams)

    const queryClient = getQueryClient()
    await queryClient.prefetchInfiniteQuery({
        queryKey: ['products', category, filters.minPrice, filters.maxPrice, filters.tags, filters.sort], 
        queryFn: ({pageParam}) => {
            return apiService.getInfiniteQueries(pageParam)
        },
        initialPageParam: `${process.env.NEXT_PUBLIC_API_URL}/products/${category}?minPrice=${filters.minPrice}&maxPrice=${filters.maxPrice}&tags=${[filters.tags]}&sort=${filters.sort}&limit=${DEFAULT_LIMIT_PAGINATION}`,
    })

    return (
        <>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <ProductListViewCategory category={category}/>
            </HydrationBoundary>
        </>
        
    )
}
export default Page;