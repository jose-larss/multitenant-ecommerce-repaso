"use client";

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useProductsFilters } from "../../hooks/useProductsFilterClient"

export const ProductSort = () => {
    const [filters, setFilters] = useProductsFilters();

    return(
        <div className="flex items-center gap-2">
            <Button
                size={"sm"}
                className={cn(
                    "rounded-full bg-white hover:bg-white",
                    filters.sort !== "clasificacion" && "bg-transparent border-transparent hover:border-border hover:bg-transparent"
                )}
                variant={"elevated"}
                onClick={() => setFilters({sort: "clasificacion"})}
            >
                Clasificacion
            </Button>
            <Button
                size={"sm"}
                className={cn(
                    "rounded-full bg-white hover:bg-white",
                    filters.sort !== "tendencia" && "bg-transparent border-transparent hover:border-border hover:bg-transparent"
                )}
                variant={"elevated"}
                onClick={() => setFilters({sort: "tendencia"})}
            >
                Tendencia
            </Button>
            <Button
                size={"sm"}
                className={cn(
                    "rounded-full bg-white hover:bg-white",
                    filters.sort !== "caliente_y_nuevo" && "bg-transparent border-transparent hover:border-border hover:bg-transparent"
                )}
                variant={"elevated"}
                onClick={() => setFilters({sort: "caliente_y_nuevo"})}
            >
                Caliente y nuevo
            </Button>
        </div>
    )
}