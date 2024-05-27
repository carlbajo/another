"use client";
import { Sun, Moon, Loader2 } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Toggle } from "@/components/ui/toggle";

export function ToggleTheme(){
    const { resolvedTheme, setTheme } = useTheme();
    const [ isMounted, setIsMounted ] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);
    if(!isMounted){
        return <Toggle disabled><Loader2 className="w-6 h-6 animate-spin"/></Toggle>
    };
    const dark = resolvedTheme === "dark";
    return(
        <Toggle variant="outline" onClick={() => {
            setTheme(`${dark ? "light" : "dark"}`);
        }}>
            {dark && <Sun className="w-6 h-6"/>}
            {!dark && <Moon className="w-6 h-6"/>}
        </Toggle>
    );
};