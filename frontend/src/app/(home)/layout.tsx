import { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { ReactQueryProvider } from "../react-query-provider";
import { getQueryClient } from "../query-client";

import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { SearchFilters, SearchFiltersSkeleton } from "./search-filters";

interface Props {
    children: React.ReactNode
}

const fetchCategories = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/`, {
            method: "GET",
            cache: "no-store", // evita que nextJs use su propio cache
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            //Manejo de errores si el backend devuelve un estado no existoso
            const errorData = await response.json();
            console.error("Error en el backend", errorData)
            return;
        }
        //si la respuesta es exitosa
        return response.json()

    } catch (error) {
        //Manejo de errores de red o conexion
        console.error("Error al enviar datos:", error)
    }
}

const Layout = async ({children}: Props) => {
    const queryClient = getQueryClient()

    //prefetch de categorías
    await queryClient.prefetchQuery({queryKey: ["categories"], queryFn: fetchCategories})

    return(
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <ReactQueryProvider>
                <HydrationBoundary state={dehydrate(queryClient)}>
                    <Suspense fallback={<SearchFiltersSkeleton />}>
                        <SearchFilters/>
                    </Suspense>
                </HydrationBoundary>
            </ReactQueryProvider>
            
            <div className="flex-1 bg-[#F4F4F0]">
                {children}
            </div>
            <Footer />
        </div>
    )
}
export default Layout;