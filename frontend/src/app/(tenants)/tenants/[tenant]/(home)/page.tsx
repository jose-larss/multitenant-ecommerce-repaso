import { getQueryClient } from "@/app/query-client"
import apiService from "@/app/services/apiServices"

import { dehydrate, HydrationBoundary } from "@tanstack/react-query"

import type { SearchParams } from "nuqs/server"
import { loadProductFilters } from "@/modules/products/hooks/useProductsFilterServer"

import { ProductListView } from "@/modules/products/views/product-list-view"


interface Props {
    params: Promise<{tenant: string}>;
    searchParams: Promise<SearchParams>;
}

const Page = async ({params, searchParams}: Props) => {
     const queryClient = getQueryClient()
    const {tenant} = await params
    const filters = await loadProductFilters(searchParams)

    await queryClient.prefetchInfiniteQuery({
        queryKey: ['products', tenant, filters.minPrice, filters.maxPrice, filters.tags, filters.sort], 
        queryFn: ({pageParam}) => {
            return apiService.getInfiniteQueries(pageParam)
        },
        initialPageParam: `${process.env.NEXT_PUBLIC_API_URL}/products/${tenant}?minPrice=${filters.minPrice}&maxPrice=${filters.maxPrice}&tags=${[filters.tags]}&sort=${filters.sort}`,
    })

    return (
        <>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <ProductListView tenant={tenant} narrowView/>
            </HydrationBoundary>
        </>
        
    )
}
export default Page;