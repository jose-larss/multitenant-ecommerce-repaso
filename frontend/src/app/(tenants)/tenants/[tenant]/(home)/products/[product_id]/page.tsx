import { getQueryClient } from "@/app/query-client"
import apiService from "@/app/services/apiServices"

import { dehydrate, HydrationBoundary } from "@tanstack/react-query"

import { ProductView } from "@/modules/products/views/product-view"


interface Props {
    params: Promise<{tenant: string, product_id: string}>;
}

const Page = async ({params}: Props) => {
    const queryClient = getQueryClient()
    const {tenant, product_id} = await params

    await queryClient.prefetchQuery({
        queryKey: ['product', product_id, tenant], 
        queryFn: () => apiService.getNoCacheNoCredentials(`/products/detail/${product_id}/`),
    })

    return (
        <>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <ProductView tenant={tenant} product_id={product_id} />
            </HydrationBoundary>
        </>
        
    )
}
export default Page;