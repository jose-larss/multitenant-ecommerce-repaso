"use client";

import { useProductsFilters } from "../../hooks/useProductsFilterClient";
import { PriceFilter } from "./price-filter";
import { ProductFilter } from "./product-filter";
import { TagsFilters } from "./tags-filters";

export const ProductFilters = () => {
    const [filters, setFilters] = useProductsFilters();

    const onChange = (key: keyof typeof filters, value: unknown) => {
        setFilters({...filters, [key]: value})
    }

    const onClear = () => {
        setFilters({
            minPrice: "",
            maxPrice: "",
            tags: [],
        })
    }

    const hasAnyFilters = Object.entries(filters).some(([key, value]) => {
        if (key === "sort") return false;

        if (Array.isArray(value)) {
            return value.length > 0;
        }
        
        if (typeof value === "string") {
            return value !== ""
        }

        return value !== null
    })

    return(
        <div className="border rounded-md bg-white p-4">
            <div className="p-4 border-b flex items-center justify-between">
                <p className="font-medium">Filtros</p>
                {hasAnyFilters && (
                    <button
                        onClick={() => onClear()}
                        type="button"
                        className="underline cursor-pointer"
                    >
                        Limpiar
                    </button>
                )}
            </div>

            <ProductFilter title="Precio">
                <PriceFilter
                    minPrice={filters.minPrice}
                    maxPrice={filters.maxPrice}
                    onMinPriceChange={(value) => onChange("minPrice", value)}
                    onMaxPriceChange={(value) => onChange("maxPrice", value)}
                />
            </ProductFilter>

            <ProductFilter title="Tags" className="border-b-0">
                <TagsFilters 
                    value={filters.tags}
                    onChange={(value) => onChange("tags", value)}
                />
            </ProductFilter>
        </div>
    )
}