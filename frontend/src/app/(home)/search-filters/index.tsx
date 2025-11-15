"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { Categories } from "./categories";
import { SearchInput } from "./search-input";


const fetchCategories = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/`, {
            method: "GET",
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

export const SearchFilters = () => {
    const {data} = useSuspenseQuery({queryKey: ['categories'], queryFn: fetchCategories,})

    return(
        <div
            style={{backgroundColor: "#F5F5F5"}} 
            className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full"
        >
            <SearchInput />
            <div className="hidden lg:block">
                <Categories data={data}/>
            </div>
        </div>
    )
}

export const SearchFiltersSkeleton = () => {
    return(
        <div 
            className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full"
            style={{backgroundColor: "#F5F5F5"}}
        >
            <SearchInput disabled/>
            <div className="hidden lg:block">
                <div className="h-11"/>
            </div>
        </div>
    )
}