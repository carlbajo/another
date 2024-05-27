import { cn } from "@/lib/utils";
import { FC } from "react";

interface ILabel
            extends React.ComponentPropsWithoutRef<"label">{}

export const Label:FC<ILabel> = ({className, ...props}) => (
    <label className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
    )}{...props}/>
);
Label.displayName = "Label";