import { cn } from "@/lib/utils";
import { FC } from "react";

export interface IDiv
            extends React.ComponentPropsWithoutRef<"div">{}

export const Card:FC<IDiv> = ({className, ...props}) => (
    <div className={cn(
        "relative rounded-lg border bg-card text-card-foreground shadow-sm", className
    )} {...props}/>
);
Card.displayName = "Card";

export const CardHeader:FC<IDiv> = ({className, ...props}) => (
    <div className={cn(
        "flex flex-col space-y-1.5 p-6", className
    )}{...props}/>
);
CardHeader.displayName = "CardHeader";

export interface IH3
            extends React.ComponentPropsWithoutRef<"h3">{}

export const CardTitle:FC<IH3> = ({className, ...props}) => (
    <h3 className={cn(
        "text-2xl font-semibold leading-none tracking-tight", className
    )}{...props}/>
);
CardTitle.displayName = "CardTitle";

export interface IP
            extends React.ComponentPropsWithoutRef<"p">{}

export const CardDescription:FC<IP> = ({className, ...props}) => (
    <p className={cn(
        "text-sm text-muted-foreground", className
    )}{...props}/>
);
CardDescription.displayName = "CardDescription";

export const CardContent:FC<IDiv> = ({className, ...props}) => (
    <div className={cn(
        "p-6 pt-0", className
    )} {...props}/>
);
CardContent.displayName = "CardContent";

export const CardFooter:FC<IDiv> = ({className, ...props}) => (
    <div className={cn(
        "flex items-center p-6 pt-0", className
    )} {...props}/>
);
CardFooter.displayName = "CardFooter";

export const CardAction:FC<IDiv> = ({className, ...props}) => (
    <div className={cn(
        "absolute top-4 right-4", className
    )} {...props}/>
);
CardAction.displayName = "CardAction";