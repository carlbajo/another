import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import * as Component from "@radix-ui/react-toggle";
import { FC } from "react";

export const toggleVariants = cva(
    "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
    {
      variants: {
        variant: {
          default: "bg-transparent",
          outline:
            "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
        },
        size: {
          default: "h-10 px-3",
          sm: "h-9 px-2.5",
          lg: "h-11 px-5",
        },
      },
      defaultVariants: {
        variant: "default",
        size: "default",
      },
    }
);

interface IToggle
            extends VariantProps<typeof toggleVariants>,
                    React.ComponentPropsWithoutRef<typeof Component.Root>{};

export const Toggle:FC<IToggle> = ({
    variant, size, className, ...props
}) => (
    <Component.Root className={cn(toggleVariants({
        variant, size, className
    }))}{...props}/>
);
Toggle.displayName = Component.Root.displayName;