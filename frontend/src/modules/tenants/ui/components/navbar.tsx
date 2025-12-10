"use client";

import apiService from "@/app/services/apiServices";
import { generateTenantSlugURL } from "@/lib/utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

interface Props {
    tenantSlug: string;
}

export const Navbar = ({tenantSlug}: Props) => {
    const {data} = useSuspenseQuery({queryKey: ["tenant"], queryFn: () => apiService.getNoCacheNoCredentials(`/tenant/detail/${tenantSlug}/`)})

    return(
        <nav className="h-20 border-b font-medium bg-white">
            <div className="max-w-(--breakpoint-xl) mx-auto flex justify-between items-center h-full px-4 lg:px-12">
                <Link href={generateTenantSlugURL(tenantSlug)} className="flex items-center gap-2">
                    {data.imagen && (
                        <Image 
                            src={data.imagen}
                            width={32}
                            height={32}
                            className="rounded-full border shrink-0 size-8"
                            alt={tenantSlug}
                        />
                    )}
                    <p className="text-xl">{data.name}</p>
                </Link>
            </div>
        </nav>
    )
}

export const NavbarSkeleton = () => {
    return(
        <nav className="h-20 border-b font-medium bg-white">
            <div className="max-w-(--breakpoint-xl) mx-auto flex justify-between items-center h-full px-4 lg:px-12">
                <div>
                    {/*TODO SKELETON BUTTON */}
                </div>
            </div>
        </nav> 
    )
}