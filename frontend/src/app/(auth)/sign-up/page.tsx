"use client";

import { redirect } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { SignUpView } from "@/modules/auth/ui/sign-up-view";
import apiService from "@/app/services/apiServices";

/*
const fetchSession = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me/`, {
            method: "GET",
            credentials: "include",   // 👈 equivalente a withCredentials: true
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            //Manejo de errores si el backend devuelve un estado no existoso
            const errorData = await response.json();
            //console.error("Error en el backend", errorData)
            return errorData
        }
        //si la respuesta es exitosa
        const data = response.json()
        return data;

    } catch (error) {
        //Manejo de errores de red o conexion
        console.error("Error al enviar datos:", error)
    }
}
*/

const Page = () => {
    const {data, isLoading, error} = useQuery({queryKey: ['session'], queryFn: () => apiService.get("/auth/me/"),})

    try {
        data.id
    } catch {
       redirect("/")
    }
    
    return(<SignUpView />)
}

export default Page;