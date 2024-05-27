import { cn } from "@/lib/utils";
import Image from "next/image";

export function UDDLOGO({
    className
} : {
    className?: string
}){
    return(
        <div className={cn(
            "relative", className
        )}>
            <Image src="/logo/udd.png" alt="udd-logo" className="object-cover" fill/>
        </div>
    );
};