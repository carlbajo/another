import "@/app/globals.css";
import { GeistSans } from "geist/font/sans";
import { Header, Sidebar } from "@/components/compile/root";
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
                    <div className="max-w-5xl w-full mx-auto">
                        <Header />
                        <div className="md:grid md:grid-cols-5 gap-4 mt-8">
                            <div className="md:col-span-1">
                                <Sidebar />
                            </div>
                            <div className="md:col-span-4">
                                { children }
                            </div>
                        </div>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
};