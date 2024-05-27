import { cn } from "@/lib/utils";
import { FC } from "react";
import { Label } from "@/components/ui/label";

interface ITextarea
            extends React.ComponentPropsWithoutRef<"textarea">{
                label?: string
            };

export const Textarea:FC<ITextarea> = ({className, ...props}) => (
    <textarea className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
    )}{...props}/>
);
Textarea.displayName = "Textarea";

export const TextareaLabel:FC<ITextarea> = ({label, ...prop}: {label?: string}) => {
    return(
        <div className="grid gap-3 w-full">
            {label && <Label>{label}</Label>}
        <Textarea {...prop}/>
    </div>
    );
}