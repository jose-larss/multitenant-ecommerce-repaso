import { getQueryClient } from "@/app/query-client"
import apiService from "@/app/services/apiServices"
import { ProductListSkeleton, ProductsList } from "@/modules/products/ui/components/products-list"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { Suspense } from "react"

interface Props {
    params: Promise<{
        category: string,
        subcategory: string,
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
            <div>SubCategory Page: {subcategory}</div>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <Suspense fallback={<ProductListSkeleton/>}>
                    <ProductsList 
                        category={category}
                        subcategory={subcategory}    
                    />
                </Suspense>
            </HydrationBoundary>
        </>
        
    )
}
export default Page;