import { getQueryClient } from "@/app/query-client"
import apiService from "@/app/services/apiServices"
import { ProductFilters } from "@/modules/products/ui/components/products-filters"
import { ProductsList, ProductListSkeleton } from "@/modules/products/ui/components/products-list"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { Suspense } from "react"

interface Props {
    params: Promise<{
        category: string,
         subcategory?: string,
    }>
}

const Page = async ({params}: Props) => {
    const {category, subcategory} = await params

    const queryClient = getQueryClient()
    await queryClient.prefetchQuery({queryKey: ['products'], 
        queryFn: () => apiService.getNoCacheNoCredentials(`/products/${category}/${subcategory}/`)})

    return (
        <>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <div className="p-4 lg:px-12 py-8 flex flex-col gap-4">  
                    
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