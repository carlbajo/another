import "@/app/globals.css";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";

import { ThemeProvider } from "@/components/theme/theme";

export const metadata: Metadata = {};

export default function AuthenticationLayout({
    children
}: { children: React.ReactNode }){
    return(
        <html lang="en">
            <body className={ GeistSans.className }>
                <ThemeProvider>
                    <div className="w-full min-h-screen relative flex md:items-center justify-center p-1 md:p-0">
                        { children }
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
};