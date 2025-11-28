"use client";

import { useProductsFilters } from "../../hooks/useProductsFilter";
import { PriceFilter } from "./price-filter";
import { ProductFilter } from "./product-filter";

export const ProductFilters = () => {
    const [filters, setFilters] = useProductsFilters();

    const onChange = (key: keyof typeof filters, value: unknown) => {
        setFilters({...filters, [key]: value})
    }

    return(
        <div className="border rounded-md bg-white p-4">
            <div className="p-4 border-b flex items-center justify-between">
                <p className="font-medium">Filtros</p>
                <button
                    onClick={() => {}}
                    type="button"
                    className="underline"
                >
                    Limpiar
                </button>
            </div>

            <ProductFilter title="Precio">
                <PriceFilter
                    minPrice={filters.minPrice}
                    maxPrice={filters.maxPrice}
                    onMinPriceChange={(value) => onChange("minPrice", value)}
                    onMaxPriceChange={(value) => onChange("maxPrice", value)}
                />
            </ProductFilter>
        </div>
    )
}