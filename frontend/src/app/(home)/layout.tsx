"use client";

import React, {useState, useEffect} from "react";

import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { SearchFilters } from "./search-filters";

interface Props {
    children: React.ReactNode
}

const Layout = ({children}: Props) => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const categories = async () => {
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
                const data = await response.json()
            
                setCategories(data)
            } catch (error) {
                    //Manejo de errores de red o conexion
                    console.error("Error al enviar datos:", error)
            }
        }
        categories();
    }, [])

    return(
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <SearchFilters data={categories}/>
            <div className="flex-1 bg-[#F4F4F0]">
                {children}
            </div>
            <Footer />
        </div>
    )
}
export default Layout;