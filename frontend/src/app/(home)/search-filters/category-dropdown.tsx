import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import { useDropDownPosition } from "./use-dropdown-position";
import { SubcategoryMenu } from "./subcategory-menu";

interface Category {
    id: string;
    name: string;
    slug: string;
    color: string;
    created_at: string;
    updated_at: string;
    subcategorias: Category[]; // relaccion recursiva (subcategorias)
}

interface Props {
    category: Category;
    isActive?: boolean;
    isNavigationHovered?: boolean;
}

export const CategoryDropDown = ({category, isActive, isNavigationHovered}: Props) => {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const {getDropDownPosition} = useDropDownPosition(dropdownRef)
    const dropDownPosition = getDropDownPosition()

    const onMouseEnter = () => {
        if (category.subcategorias) {
            setIsOpen(true)
        }
    }

    const onMouseLeave = () => setIsOpen(false)

    return(  
        <div className="relative" ref={dropdownRef} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <div className="relative">
                <Button
                    variant={"elevated"}
                    className={cn(
                        "h-11 px-4 bg-transparent border-transparent rounded-full hover:bg-white hover:border-primary text-black",
                        isActive && !isNavigationHovered && "bg-white border-primary"
                    )}
                >
                    {category.name}
                </Button>

                {category.subcategorias && category.subcategorias.length > 0 && (
                    <div className={cn(
                            "opacity-0 absolute -bottom-3 w-0 h-0 border-l-10 border-r-10 border-b-10 border-l-transparent " + 
                            "border-r-transparent border-b-black left-1/2 -translate-x-1/2",
                            isOpen && "opacity-100"
                        )}>
                    </div>
                )}
            </div>

            <SubcategoryMenu 
                category={category}
                isOpen={isOpen}
                position={dropDownPosition}
            />
        </div>
    )
}