import {
    CardContainer, CardContent
} from "@/components/compile/card";
import {
    Form, FormControl, FormField, FormSubmit, FormMessage
} from "@/components/compile/form";
import {
    DialogContainer, DialogContainerContent, DialogClose
} from "@/components/compile/dialog";
import { 
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { Capsule } from "../capsule";
import { Label } from "@/components/ui/label";
import { GetPredefinedSkills, GetUserById } from "@/lib/crud";
import { auth } from "@/auth";
import { PlusIcon, MessageCircleCodeIcon } from "lucide-react";
import { Add } from "@/actions/user/skill";
export async function SkillCard(){
    const skills = await GetPredefinedSkills();
    const session = await auth();
    const user = await GetUserById(`${session?.user?.id}`);
    return(
        <CardContainer
        title="Manage Skill(s)"
        description="We learned different skills as time passes by"
        hasLogo={false}>
            <CardContent>
                {user?.skill.length === 0 && (
                    <p>No skill's has been added yet!</p>
                )}
                {user?.skill.length !== 0 && (
                    <>
                        {user?.skill.map(item => (
                            <Capsule 
                            key={item.id} 
                            text={item.name}
                            style="bg-accent/40 px-2 rounded text-accent-foreground"/>
                        ))}
                    </>
                )}
            </CardContent>
            <DialogContainer 
            title="Add skill"
            description="Hey add skill here"
            trigger={
                <PlusIcon className="w-10 h-10 p-2 rounded-full bg-accent absolute top-6 right-6 cursor-pointer text-accent-foreground"/>
            }>
                {/* Add */}
                <DialogContainerContent>
                <Form action={Add}>
                    <input type="hidden" name="userId" value={user?.id} />
                    <div className="grid gap-3 w-full">
                        <Label>Add Skill</Label>
                        <Select name="skillId">
                            <SelectTrigger className="">
                            <SelectValue placeholder="Options here"/>
                            </SelectTrigger>
                            <SelectContent>
                                {skills.map((skill) => (
                                <SelectItem value={skill.id}>{skill.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <FormSubmit className="w-full">Add</FormSubmit>
                    <span className="hidden md:flex items-center gap-2 text-muted-foreground/50 text-sm">
                        <MessageCircleCodeIcon className="w-6 h-6"/>
                        <p>You can use your keyboard to navigate through options quickly</p>
                    </span>
                </Form>
                </DialogContainerContent>
            </DialogContainer>
        </CardContainer>
    );
};