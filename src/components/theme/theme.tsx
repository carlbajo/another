"use client";
import { ThemeProvider as NextThemes } from "next-themes"

export function ThemeProvider({
    children
}: { children: React.ReactNode }) {
    return(
        <NextThemes 
            attribute="class" 
            enableSystem disableTransitionOnChange>
                {children}
        </NextThemes>
    );
}