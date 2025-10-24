import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import Link from "next/link";

interface NavbarItem {
    href: string,
    children: React.ReactNode,
}

interface Props {
    items: NavbarItem[];
    open:boolean;
    onOpenChange: (open: boolean) => void
}

export const NavbarSidebar = ({items, open, onOpenChange}: Props) => {
    return(
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="left" className="p-0 transition-none">
                <SheetHeader className="p-4 border-b">
                    <div className="flex items-center">
                        <SheetTitle className="">
                            Menu
                        </SheetTitle>
                    </div>
                </SheetHeader>

                <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
                    {items.map((item) => (
                        <Link
                            className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
                            onClick={() => (onOpenChange(false))}
                            key={item.href}
                            href={item.href}
                        >
                            {item.children}
                        </Link>
                    ))}

                    <div className="border-t">
                        <Link 
                            className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
                            href={"/sign-in"}
                        >
                            Log in
                        </Link>
                        <Link
                            className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium" 
                            href={"/sign-up"}
                        >
                            Start Selling
                        </Link>
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}