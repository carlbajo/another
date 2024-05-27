import { LogOut } from "lucide-react";
import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
export function Signout(){
    return(
        <form action={async() => {
            "use server"
            await signOut({
                redirectTo: "/signin"
            });
        }}>
            <Button className="flex items-center gap-2" variant="default" type="submit" asChild>
                <LogOut className="w-5 h-5"/>
                <span>Signout</span>
            </Button>
        </form>
    );
};