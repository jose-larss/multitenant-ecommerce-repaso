import { cn } from "@/lib/utils";
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import { useState } from "react";

interface ProductFilterProps {
    title: string;
    className?: string;
    children: React.ReactNode;
}

export const ProductFilter = ({title, className, children}: ProductFilterProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const Icon = isOpen ? ChevronDownIcon : ChevronRightIcon

    return(
        <div className={cn ("p-4 border-b flex flex-col gap-2", className)}>
            <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setIsOpen((current) => !current)}
            >
                <p className="font-medium">{title}</p>
                <Icon className="size-5"/>
            </div>
            {isOpen && children}
        </div>
    )
}