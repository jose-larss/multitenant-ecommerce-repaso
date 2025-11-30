import { Suspense } from "react"
import { getQueryClient } from "@/app/query-client"
import apiService from "@/app/services/apiServices"
import { ProductFilters } from "@/modules/products/ui/components/products-filters"
import { ProductsList, ProductListSkeleton } from "@/modules/products/ui/components/products-list"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"

import type { SearchParams } from "nuqs/server"
import { loadProductFilters } from "@/modules/products/hooks/useProductsFilterServer"
import { ProductSort } from "@/modules/products/ui/components/product-sort"


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
    await queryClient.prefetchQuery({
        queryKey: ['products', category, filters.minPrice, filters.maxPrice, filters.tags, filters.sort], 
        queryFn: () => apiService.getNoCacheNoCredentials(
            `/products/${category}?minPrice=${filters.minPrice}&maxPrice=${filters.maxPrice}&tags=${[filters.tags]}&sort=${filters.sort}`
    )})

    return (
        <>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <div className="p-4 lg:px-12 py-8 flex flex-col gap-4">  
                    
                    <div className="flex flex-col lg:flex-row lg:items-center gap-y-2 lg:gap-y-0 justify-between">
                        <p className="text-2xl font-medium">Conservado para ti</p>
                        <ProductSort />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-6 xl:grid-cols-8 gap-y-6 gap-x-12">
                        <div className="lg:col-span-2 xl:col-span-2">
                            <div className="border p-2">
                                <ProductFilters/>
                            </div>
                        </div>
                    
                        <div className="lg:col-span-4 xl:col-span-6">
                            <Suspense fallback={<ProductListSkeleton/>}>
                                <ProductsList category={category}/>
                            </Suspense>
                        </div>
                    </div>
                </div>
            </HydrationBoundary>
        </>
        
    )
}
export default Page;