"use client";
import { cn } from "@/lib/utils";
import { isMatch } from "@/lib/helper";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SideLink({
    children, href
} : {
    children: React.ReactNode,
    href: string
}){
    const pathname = usePathname();
    return(
        <Link href={href} className={cn(
            "p-1 block rounded",
            isMatch<string>(pathname, href) ? "bg-primary text-primary-foreground" :
            "bg-transparent text-muted-foreground/60"
        )}>
            {children}
        </Link>
    );
};