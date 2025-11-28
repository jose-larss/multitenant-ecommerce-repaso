import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChangeEvent } from "react";


interface Props {
    minPrice?: string | null;
    maxPrice?: string | null;
    onMinPriceChange: (value: string) => void;
    onMaxPriceChange: (value: string) => void;
}

export const formAsCurrency = (value: string) => {
    const numericValue = value.replace(",", ".").replace(/[^0-9.]/g, "")

    const parts = numericValue.split(".")
    const formattedValue = parts[0] + (parts.length > 1 ? "." + parts[1].slice(0,2) : "")

    if (!formattedValue) return ""

    const numberValue = parseFloat(formattedValue)
    if (isNaN(numberValue)) return ""

    return new Intl.NumberFormat("en-ES", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    }).format(numberValue)
}


export const PriceFilter = ({minPrice, maxPrice, onMinPriceChange, onMaxPriceChange}: Props) => {
    const handleMinPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        //agarrar el crudo del value del input y extraer la parte numerica
        const numericValue = e.target.value.replace(/[^0-9.]/g, "");
        onMinPriceChange(numericValue)
    }

    const handleMaxPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        //agarrar el crudo del value del input y extraer la parte numerica
        const numericValue = e.target.value.replace(/[^0-9.]/g, "");
        onMaxPriceChange(numericValue)
    }

    return(
        <div className="flex flex-col gap-2">
            <div className="flez flex-col gap-2">
                <Label className="font-medium text-base">
                    Precio mínimo
                </Label>
                <Input 
                    type="text"
                    placeholder="0€"
                    value={minPrice ? formAsCurrency(minPrice) : ""}
                    onChange={handleMinPriceChange}
                />
            </div>

            <div className="flez flex-col gap-2">
                <Label className="font-medium text-base">
                    Precio máximo
                </Label>
                <Input 
                    type="text"
                    placeholder="∞"
                    value={maxPrice ? formAsCurrency(maxPrice) : ""}
                    onChange={handleMaxPriceChange}
                />
            </div>
        </div>
    )
}