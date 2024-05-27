import {
    Card, CardHeader, CardTitle, CardDescription, CardContent
} from "@/components/ui/card";
import Image from "next/image";

interface CardInterface extends React.ComponentPropsWithoutRef<typeof Card> {
    title: string,
    description?: string,
    hasLogo?: boolean
}

export function CardContainer({
    title, description, children, hasLogo = true, ...props
}: CardInterface){
    return(
        <Card {...props}>
            <CardHeader className="mb-4 border-border border-b">
                {hasLogo && (
                    <div className="flex gap-3">
                        <div className="relative w-12 h-12">
                            <Image src="/logo/udd.png" alt="udd_logo" fill/>
                        </div>
                        <div className="space-y-2 flex-1">
                            <CardTitle>{ title }</CardTitle>
                            {description && 
                            <CardDescription>{ description }</CardDescription>}
                        </div>
                    </div>
                )}
                {!hasLogo && (
                    <>
                        <CardTitle>{ title }</CardTitle>
                        {description && 
                        <CardDescription>{ description }</CardDescription>}
                    </>
                )}
            </CardHeader>
            { children }
        </Card>
    );
};

export { CardContent }