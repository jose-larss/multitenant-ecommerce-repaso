import { getQueryClient } from "@/app/query-client"
import apiService from "@/app/services/apiServices"
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
            <div>Category Page: {category}</div>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <Suspense fallback={<ProductListSkeleton/>}>
                    <ProductsList category={category}/>
                </Suspense>
            </HydrationBoundary>
        </>
        
    )
}
export default Page;