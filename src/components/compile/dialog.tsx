import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogClose
} from "@/components/ui/dialog";

import Image from "next/image";

interface DialogInterface extends React.ComponentPropsWithoutRef<typeof Dialog> {
    title: string,
    description?: string,
    trigger: React.ReactNode
}

export function DialogContainer({
    title, description, children, trigger, ...props
}: DialogInterface ){
    return(
        <Dialog {...props}>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <div className="flex gap-3">
                        <div className="relative w-12 h-12">
                            <Image src="/logo/udd.png" alt="udd_logo" fill />
                        </div>
                        <div className="text-start space-y-2">
                            <DialogTitle>{ title }</DialogTitle>
                            {description && 
                            <DialogDescription>{ description }</DialogDescription>}
                        </div>
                    </div>
                </DialogHeader>
                { children }
            </DialogContent>
        </Dialog>
    );
};

export function DialogContainerContent({...props}: React.ComponentPropsWithoutRef<"div">){
    return <div {...props}/>
};

export { DialogTrigger, DialogClose }