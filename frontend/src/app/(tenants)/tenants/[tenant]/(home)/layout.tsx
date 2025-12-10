import { getQueryClient } from "@/app/query-client";
import apiService from "@/app/services/apiServices";
import { Footer } from "@/modules/tenants/ui/components/footer";
import { Navbar, NavbarSkeleton } from "@/modules/tenants/ui/components/navbar";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React, { Suspense } from "react";

interface LayoutProps {
    children: React.ReactNode;
    params: Promise<{tenant: string}>
}

const Layout = async ({children, params}: LayoutProps) => {
    const {tenant} = await params;
    const queryClient = getQueryClient()

    await queryClient.prefetchQuery({queryKey: ["tenant"], queryFn: () => apiService.getNoCacheNoCredentials(`/tenant/detail/${tenant}/`)})

    return(
        <div className="min-h-screen bg-[#F4F4F0] flex flex-col">
            <HydrationBoundary state={dehydrate(queryClient)}>
                <Suspense fallback={<NavbarSkeleton/>}>
                    <Navbar tenantSlug = {tenant}/>
                </Suspense>
            </HydrationBoundary>
                <div className="flex-1">
                    <div className="mx-w-(--breakpoint-xl) mx-auto">
                        {children}
                    </div>
                </div>
            <Footer/>
        </div>
    )
}
export default Layout;