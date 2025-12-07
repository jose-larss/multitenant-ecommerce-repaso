import { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getQueryClient } from "../query-client";

import { Navbar } from "../../modules/home/ui/components/navbar";
import { Footer } from "../../modules/home/ui/components/footer";
import { SearchFilters, SearchFiltersSkeleton } from "../../modules/home/ui/components/search-filters";
import apiService from "../services/apiServices";

interface Props {
    children: React.ReactNode
}

const Layout = async ({children}: Props) => {
    const queryClient = getQueryClient()

    //prefetch de categorías
    await queryClient.prefetchQuery({queryKey: ["categories"], queryFn: () => apiService.getNoCacheNoCredentials("/categories/")})

    return(
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <HydrationBoundary state={dehydrate(queryClient)}>
                <Suspense fallback={<SearchFiltersSkeleton />}>
                    <SearchFilters/>
                </Suspense>
            </HydrationBoundary>
      
            <div className="flex-1 bg-[#F4F4F0]">
                {children}
            </div>
            <Footer />
        </div>
    )
}
export default Layout;