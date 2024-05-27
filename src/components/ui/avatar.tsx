"use client";
import * as Component from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";
import { FC } from "react";

interface IAvatar 
    extends React.ComponentPropsWithoutRef<typeof Component.Avatar>{};

export const Avatar:FC<IAvatar> = ({className, ...props}) => (
    <Component.Avatar className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className
    )}{...props}/>
);

Avatar.displayName = "Avatar";

interface IAvatarImage
    extends React.ComponentPropsWithoutRef<typeof Component.AvatarImage>{};

export const AvatarImage:FC<IAvatarImage> = ({className, ...props}) => (
    <Component.AvatarImage className={cn(
        "aspect-square h-full w-full", className
    )}{...props}/>
);

AvatarImage.displayName = "AvatarImage";

interface IAvatarFallback
    extends React.ComponentPropsWithoutRef<typeof Component.AvatarFallback>{};

export const AvatarFallback:FC<IAvatarFallback> = ({className, ...props}) => (
    <Component.AvatarFallback className={cn(
        "flex h-full w-full items-center justify-center rounded-full bg-muted", className
    )}{...props}/>
);

AvatarFallback.displayName = "AvatarFallback";