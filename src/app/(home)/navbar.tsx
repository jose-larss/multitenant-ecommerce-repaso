"use client";

import { cn } from "@/lib/utils"
import { Poppins } from "next/font/google"
import Link from "next/link"

import { NavbarItem, navbarItems } from "./NavbarItem"
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { NavbarSidebar } from "./navbar-sidebar";
import { useState } from "react";
import { MenuIcon } from "lucide-react";

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['700'],
})

export const Navbar = () => {
    const pathname = usePathname()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    return(
        <nav className="h-20 flex border-b justify-between font-medium bg-white">
            <Link href={"/"} className="pl-6 flex items-center">
                <span className={cn("text-5xl font-semibold", poppins.className)}>
                    funroad
                </span>
            </Link>

            <NavbarSidebar items={navbarItems} open={isSidebarOpen} onOpenChange={setIsSidebarOpen}/>

            <div className="items-center gap-4 hidden lg:flex">
                {navbarItems.map((item) => (
                    <NavbarItem
                        key={item.href} 
                        href={item.href}
                        isActive={pathname === item.href}
                    >
                        {item.children}
                    </NavbarItem>
                ))}
            </div>

            <div className="hidden lg:flex">
                <Button
                    asChild
                    variant={"secondary"}
                    className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-white hover:bg-blue-400
                        transition-colors text-lg"
                >   
                    <Link href={"/sign-in"}>
                        Log in
                    </Link>
                </Button>

                <Button
                    asChild
                    className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-black text-white
                     hover:bg-blue-400 hover:text-black transition-colors text-lg"
                >   
                    <Link href={"/sign-up"}>
                        Start Selling
                    </Link>
                </Button>
            </div>

            <div className="flex lg:hidden items-center justify-center">
                <Button
                    variant={"ghost"}
                    className="size-12 border-transparent bg-white"
                    onClick={() => setIsSidebarOpen(true)}
                >
                    <MenuIcon />
                </Button>
            </div>
        </nav>  
    )
}