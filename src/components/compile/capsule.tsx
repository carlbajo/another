import { cn } from "@/lib/utils";

type TCapsule = {
    text: string,
    style?: string,
};

export const Capsule:React.FC<TCapsule> = ({
     text, style
}) => {
    return (
        <span className={cn(
            "p-1 mx-2", style
        )}>{ text }</span>
    );
};