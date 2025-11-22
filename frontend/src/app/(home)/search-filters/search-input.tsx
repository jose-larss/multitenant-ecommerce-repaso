import { Input } from "@/components/ui/input";
import { BookmarkCheckIcon, ListFilterIcon, SearchIcon } from "lucide-react";
import { CustomCategory } from "../types";
import { CategoriesSidebar } from "./categories-sidebar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";


interface Props {
    disabled?: boolean;
}

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

export const SearchInput = ({disabled}: Props) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const session = useQuery({queryKey: ['session'], queryFn: fetchSession})

    return(
        <div className="flex items-center gap-2 w-full">
            <CategoriesSidebar open={isSidebarOpen} onOpenChange={setIsSidebarOpen}/>
            <div className="relative w-full">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
                <Input className="pl-8" placeholder="Buscar Producto" disabled={disabled}/>
            </div>
            {/* TODO: add categories view all button */}
            <Button
                variant={"elevated"}
                className="size-12 shrink-0 flex lg:hidden"
                onClick={() => setIsSidebarOpen(true)}
            >
                <ListFilterIcon />
            </Button>

            {/* TODO: add librarybutton */}
            {session.data?.username && (
                <Button
                    asChild
                    variant={"elevated"}
                >
                    <Link href={"/library"}>
                        <BookmarkCheckIcon />
                        Librería
                    </Link>
                </Button>
            )}
        </div>
    )
} 