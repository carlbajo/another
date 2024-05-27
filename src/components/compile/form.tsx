"use client";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCheck, MessageCircleWarning } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { Prop } from "@/components/ui/input";


interface FormInterface {
    action: (
        state: { message: string },
        formData: FormData 
    ) => Promise<{ message: string }>,
    children: React.ReactNode,
    className?: string,
};

export function Form({
    action, children, className
}: FormInterface ){
    const [state, formAction] = useFormState(action, { message: "" });
    return(
        <div>
            <form action={ formAction }>
                <div className="space-y-4">
                    {children}
                    <FormMessage message={state.message}/>
                </div>
            </form>
        </div>
    );
};

export function FormControl({
     className, children 
    } : {
     className?: string, children: React.ReactNode 
    }){
    return(
        <div className={cn(
            "flex flex-col md:flex-row gap-4", className
        )}>{ children }</div>
    );
};

interface FormSubmitInterface extends React.ComponentPropsWithoutRef<typeof Button>{}

export function FormSubmit({children, ...props}: FormSubmitInterface){
    const { pending } = useFormStatus();
    return(
        <Button disabled={pending} {...props}>
            { pending && <Loader2 className="w-6 h-6 animate-spin"/> }
            { !pending && children }
        </Button>
    );
};

interface FormFieldInterface extends React.ComponentPropsWithoutRef<typeof Input>{
    label?: string,
}
export function FormField({label, ...props}: FormFieldInterface){
    return(
        <div className="grid gap-3 w-full">
            {label && <Label>{ label }</Label>}
            <Input {...props}/>
        </div>
    );
};

export function FormMessage({ message }: { message: string }){
    return(
        <div className="w-full py-1">
            {message.endsWith(".") && (
                <span className="text-emerald-500 flex gap-3">
                    <CheckCheck className="w-6 h-6"/>
                    { message }
                </span>
            )}
            {message.endsWith("!") && (
                <span className="text-red-500 flex gap-3">
                    <MessageCircleWarning className="w-6 h-6"/>
                    { message }
                </span>
            )}
        </div>
    );
};

export function FormNavigateTo({
    href, children
}: {
    href: string, children: React.ReactNode
}){
    const router = useRouter();
    return(
        <div className="w-full">
            <Button type="button" variant="link" size="link" onClick={() => router.push(href)} asChild>
                { children }
            </Button>
        </div>
    );
};

interface InterfaceInputParams extends Prop {
    parameter: string,
};
export function FormFieldParams({ parameter, ...props }: InterfaceInputParams){
    const params = useSearchParams();
    const value = params.get(parameter);
    if(value){
        return(
            <input type="hidden" value={value} {...props}/>
        );
    }
};