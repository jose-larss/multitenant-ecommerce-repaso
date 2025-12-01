import { getQueryClient } from "@/app/query-client"
import apiService from "@/app/services/apiServices"
import { loadProductFilters } from "@/modules/products/hooks/useProductsFilterServer"

import { ProductListViewSubcategory } from "@/modules/products/views/product-list-view-subcategory"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { SearchParams } from "nuqs/server"


interface Props {
    params: Promise<{
        category: string,
        subcategory: string,
    }>;
    searchParams: Promise<SearchParams>;
}

const Page = async ({params, searchParams}: Props) => {
    const {category, subcategory} = await params
    const filters = await loadProductFilters(searchParams) 

    const queryClient = getQueryClient()
    await queryClient.prefetchInfiniteQuery({queryKey: ['products', category, subcategory, filters.minPrice, filters.maxPrice, filters.tags, filters.sort], 
        queryFn: ({pageParam}) => {
            return apiService.getInfiniteQueries(pageParam)
        },
        initialPageParam: `${process.env.NEXT_PUBLIC_API_URL}/products/${category}/${subcategory}?minPrice=${filters.minPrice}&maxPrice=${filters.maxPrice}&tags=${[filters.tags]}&sort=${filters.sort}`
    })

    return (
        <>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <ProductListViewSubcategory 
                    category={category}
                    subcategory={subcategory}    
                />
            </HydrationBoundary>
        </>
        
    )
}
export default Page;