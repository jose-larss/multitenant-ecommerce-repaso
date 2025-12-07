import { loadProductFilters } from "@/modules/products/hooks/useProductsFilterServer";
import type { SearchParams } from "nuqs/server"
import { getQueryClient } from "../query-client";
import apiService from "../services/apiServices";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ProductListView } from "@/modules/products/views/product-list-view";

interface Props {
    searchParams: Promise<SearchParams>;
}

const Home = async ({searchParams}: Props) => {
    const filters = await loadProductFilters(searchParams)

    const queryClient = getQueryClient()
    await queryClient.prefetchInfiniteQuery({
        queryKey: ['products', filters.minPrice, filters.maxPrice, filters.tags, filters.sort], 
        queryFn: ({pageParam}) => {
            return apiService.getInfiniteQueries(pageParam)
        },
        initialPageParam: `${process.env.NEXT_PUBLIC_API_URL}/products?minPrice=${filters.minPrice}&maxPrice=${filters.maxPrice}&tags=${[filters.tags]}&sort=${filters.sort}`,
    })

    return (
        <>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <ProductListView />
            </HydrationBoundary>
        </>
    );
}
export default Home;
