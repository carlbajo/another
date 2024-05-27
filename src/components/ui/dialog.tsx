"use client";
import * as Component from "@radix-ui/react-dialog";

import { cn } from "@/lib/utils";
import { FC } from "react";
import { X } from "lucide-react";
import { IDiv } from "./card";

export const Dialog = Component.Root;
export const DialogTrigger = Component.Trigger;
export const DialogPortal = Component.Portal;
export const DialogClose = Component.Close;

interface IDialogOverlay
            extends React.ComponentPropsWithoutRef<typeof Component.Overlay>{}
export const DialogOverlay:FC<IDialogOverlay> = ({className, ...props}) => (
    <Component.Overlay className={cn(
        "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
    )}{...props}/>
);
DialogOverlay.displayName = "DialogOverlay";

interface IDialogContent
            extends React.ComponentPropsWithoutRef<typeof Component.Content>{}
export const DialogContent:FC<IDialogContent> = ({className, children, ...props}) => (
    <DialogPortal>
        <DialogOverlay />
        <Component.Content className={cn(
                "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg max-h-[600px] overflow-scroll",
                className
        )} {...props}>
            {children}
            <Component.Close 
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                <X className="w-8 h-8 p-1 bg-destructive rounded-full text-destructive-foreground"/>
            </Component.Close>
        </Component.Content>
    </DialogPortal>
);
DialogContent.displayName = "DialogContent";

export const DialogHeader:FC<IDiv> = ({className, ...props}) => (
    <div className={cn(
        "flex flex-col space-y-1.5 text-center sm:text-left",
        className
    )} {...props}/>
);
DialogHeader.displayName = "DialogHeader";

export const DialogFooter:FC<IDiv> = ({className, ...props}) => (
    <div className={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
        className
    )} {...props}/>
);
DialogFooter.displayName = "DialogFooter";

interface IDialogTitle
            extends React.ComponentPropsWithoutRef<typeof Component.Title>{}
export const DialogTitle:FC<IDialogTitle> = ({className, ...props}) => (
    <Component.Title className={cn(
        "text-lg font-semibold leading-none tracking-tight",
        className
    )} {...props}/>
);
DialogTitle.displayName = "DialogTitle";

interface IDialogDescription
            extends React.ComponentPropsWithoutRef<typeof Component.Description>{}
export const DialogDescription:FC<IDialogDescription> = ({className, ...props}) => (
    <Component.Description className={cn(
        "text-sm text-muted-foreground",
        className
    )} {...props}/>
);
DialogDescription.displayName = "DialogDescription";