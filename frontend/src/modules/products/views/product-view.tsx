"use client"

import apiService from "@/app/services/apiServices";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { StarRating } from "@/components/ui/star-rating";
import { formatCurrent, generateTenantSlugURL } from "@/lib/utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import { LinkIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react/jsx-runtime";

interface ProductViewProps {
    tenant: string;
    product_id: string;
}

export const ProductView = ({tenant, product_id}: ProductViewProps) => {
    const {data} = useSuspenseQuery({
        queryKey: ['product', product_id, tenant], 
        queryFn: () => apiService.getNoCacheNoCredentials(`/products/detail/${product_id}/`),
    })

    return(
        <div className="px-4 lg:px-12 py-10">
            <div className="border rounded-sm bg-white overflow-hidden">
                <div className="relative aspect-[3.9] border-b">
                    <Image 
                        src={data.imagen || "/placeholder.png"}
                        alt={data.name}
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-6">
                    <div className="col-span-4">
                        <div className="p-6">
                            <h1 className="text-4xl font-medium">
                                {data.name}
                            </h1>
                        </div>
                        <div className="border-y flex">
                            <div className="px-6 py-4 items-center justify-center border-r">
                                <div className="relative px-2 py-1 border bg-blue-400 w-fit">
                                    <p className="text-base font-medium">
                                        {formatCurrent(data.price)}€
                                    </p>
                                </div>
                            </div>

                            <div className="px-6 py-4 flex items-center justify-center lg:border-r">
                                <Link href={generateTenantSlugURL(tenant)} className="flex items-center gap-2">
                                    {data.tenant.imagen && (
                                        <Image 
                                            src={data.tenant.imagen}
                                            alt={data.tenant.name}
                                            width={20}
                                            height={20}
                                            className="rounded-full border shrink-0 size-5"
                                        />
                                    )}
                                    <p className="text-base underline font-medium">
                                        {data.tenant.name}
                                    </p>
                                </Link>
                            </div>

                            <div className="hidden lg:flex px-6 py-4 items-center justify-center">
                                <div className="flex items-center gap-1">
                                    <StarRating 
                                        rating={3}
                                        iconClassName="size-4"
                                    />
                                </div>
                            </div>
                        </div>

                        {/*Solo mobiles */}
                        <div className="block lg:hidden px-6 py-4 items-center justify-center border-b">
                            <div className="flex items-center gap-1">
                                <StarRating 
                                    rating={3}
                                    iconClassName="size-4"
                                />
                                <p className="text-base font-medium">{5} calificaciones</p>
                            </div>
                        </div>

                        <div className="p-6">
                            {data.description ? (
                                <p>{data.description}</p>
                            ) : (
                                <p className="font-medium text-muted-foreground italic">
                                    No se proporciona descripción
                                </p>
                            )}
                        </div>

                    </div>
                    
                    <div className="col-span-2">
                        <div className="border-t lg:border-t-0 lg:border-l h-full">
                            <div className="flex flex-col gap-4 p-6 border-b">
                                <div className="flex flex-row items-center gap-2">
                                    <Button
                                        variant={"elevated"}
                                        className="flex-1 bg-blue-400"
                                    >
                                        Añadir al carro
                                    </Button>

                                    <Button
                                        variant={"elevated"}
                                        className="size-12"
                                        onClick={() => {}}
                                        disabled={false}
                                    >
                                        <LinkIcon />
                                    </Button>
                                </div>

                                <p className="text-center font-medium">
                                    {data.refundpolicy === "no-refunds"
                                        ? "Sin reembolsos"
                                        : `${data.refundpolicy} garantía de devolución de dinero`
                                    }
                                </p>
                            </div>

                            <div className="p-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-medium">
                                        calificaciones
                                    </h3>
                                    <div className="flex items-center gap-x-1 font-medium">
                                        <StarIcon className="size-4 fill-black"/>
                                        <p>({5})</p>
                                        <p className="text-base">{5} calificaciones</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-[auto_1fr_auto] gap-3 mt-4">
                                    {[5,4,3,2,1].map((stars) => (
                                        <Fragment key={stars}>
                                            <div className="font-medium">
                                                {stars} {stars === 1 ? "estrella" : "estrellas"}
                                            </div>
                                            <Progress 
                                                value={30}
                                                className="h-lh"
                                            />
                                            <div className="font-medium">
                                                {30}%
                                            </div>
                                        </Fragment>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}