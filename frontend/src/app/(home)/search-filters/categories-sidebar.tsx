import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { CustomCategory } from "../types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    data: CustomCategory[]
}

export const CategoriesSidebar = ({open, onOpenChange, data}: Props) => {
    const router = useRouter();
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
                    {currentCategories.map((category) => (
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