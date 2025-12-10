import { generateTenantSlugURL } from "@/lib/utils"
import { StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React from "react"

interface ProductCardProps {
    id: string,
    name: string,
    imagen?: string | null,
    tenantSlug: string,
    tenantImageUrl?: string | null,
    reviewRating: number,
    reviewCount: number,
    price: number, 
}

export const ProductCard = ({id, name, imagen, tenantSlug, tenantImageUrl, reviewCount, reviewRating, price}: ProductCardProps) => {
    const router = useRouter()

    const handleUserClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        router.push(generateTenantSlugURL(tenantSlug))
    }
  
    return(
        <Link href={`/product/${id}`}>
            <div className="border rounded-md bg-white overflow-hidden h-full flex flex-col">
                <div className="relative w-full h-64">
                    <Image alt={name} fill src={imagen || "/placeholder.png"} className="object-contain"/>
                </div>
                
                <div className="p-4 border-y flex flex-col gap-3 flex-1">
                    <h2 className="text-lg font-medium line-clamp-4">{name}</h2>
                    {/* TODO: redirect to user shop */}
                    <div
                        onClick={handleUserClick} 
                        className="flex items-center gap-2"
                    >   
                        {tenantImageUrl && (
                            <Image 
                                alt={tenantSlug}
                                src={tenantImageUrl}
                                width={16}
                                height={16}
                                className="rounded-full border shrink-0 size-4"
                            />
                        )}
                        <p className="text-sm underline font-medium">{tenantSlug}</p>
                    </div>
             
                    {reviewCount > 0 && (
                        <div className="flex items-center gap-1">
                            <StarIcon className="size-3.5 fill-black"/>
                            <p className="text-sm font-medium">
                                {reviewRating} ({reviewCount})
                            </p>
                        </div> 
                    )}
                </div>
                <div className="p-4">
                    <div className="relative px-2 py-1 border bg-blue-400 w-fit">
                        <p className="text-sm font-medium">
                            {new Intl.NumberFormat("en-ES", {
                                style: "currency",
                                currency: "EUR",
                                maximumFractionDigits: 2
                            }).format(Number(price))}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export const ProductCardSkeleton = () => {
    return(
        <div className="w-full aspect-3/4 bg-neutral-200 rounded-lg animate-pulse">

        </div>
    )
}