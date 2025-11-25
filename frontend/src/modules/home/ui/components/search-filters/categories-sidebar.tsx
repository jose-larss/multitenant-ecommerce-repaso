import { useState, Suspense } from "react";
import { useRouter } from "next/navigation";

import { useSuspenseQuery } from "@tanstack/react-query";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { CustomCategory } from "../../../../../app/(home)/types";
import apiService from "@/app/services/apiServices";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

/*
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
*/

export const CategoriesSidebar = ({open, onOpenChange}: Props) => {
    const router = useRouter();
    const {data} = useSuspenseQuery({queryKey: ['categories'], queryFn: () => apiService.getNoCacheNoCredentials("/categories/"),})

    const [parentCategories, setParentCategories] = useState<CustomCategory[] | null>(null)
    const [selectedCategories, setSelectedCategories] = useState<CustomCategory | null>(null)

    //If we have parent categories, show those, otherwise show root categories
    const currentCategories = parentCategories ?? data ?? []

    const handleCategoryClick = (category: CustomCategory) => {
        if (category.subcategorias && category.subcategorias.length > 0) {
            setParentCategories(category.subcategorias)
            setSelectedCategories(category)
        } else {
            // this is a leaf category (no subcategorias)
            if (parentCategories && selectedCategories) {
                //this is a subcategory - navigate to /category/subcategory
                router.push(`/${selectedCategories.slug}/${category.slug}`)
            } else {
                //This is the main category - navigate to /category
                if (category.slug === 'all') {
                    router.push("/")
                } else {
                    router.push(`/${category.slug}`)
                }
            }
            handleOpenChange(false)
        }
    }

    const handleOpenChange = (open: boolean) => {
        //resetea todo
        setSelectedCategories(null)
        setParentCategories(null)
        onOpenChange(open)
    }

    const handleBackClick = () => {
        if (parentCategories) {
            setParentCategories(null)
            setSelectedCategories(null)
        }
    }

    const backgroundColor = selectedCategories?.color || "white";

    return(
        <Sheet open={open} onOpenChange={handleOpenChange}>
            <SheetContent
                side="left"
                className="p-0 transition-none"
                style={{backgroundColor}}
            >
                <SheetHeader className="p-4 border-b">
                    <SheetTitle>
                        Categories
                    </SheetTitle>
                </SheetHeader>

                <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
                    {parentCategories && (
                        <button
                            onClick={handleBackClick}
                            className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium
                            cursor-pointer"
                        >
                            <ChevronLeftIcon className="size-4 mr-2"/>
                            Back
                        </button>
                    )}
                    {currentCategories.map((category: CustomCategory) => (
                        <button
                            key={category.slug}
                            onClick={() => handleCategoryClick(category)}
                            className="w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center 
                            text-base font-medium cursor-pointer"
                        >
                            {category.name}
                            {category.subcategorias && category.subcategorias.length > 0 && (
                                <ChevronRightIcon className="size-4"/>
                            )}
                        </button>
                    ))}
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}