import {
    CardContainer, CardContent
} from "@/components/compile/card";
import {
    DialogContainer, DialogContainerContent, DialogClose
} from "@/components/compile/dialog";
import {
    Form, FormControl, FormField, FormSubmit, FormNavigateTo
} from "@/components/compile/form";
import { TextareaLabel } from "@/components/ui/textarea";
import { List } from "@/components/compile/list";
// Sessions
import { auth } from "@/auth";
import { GetUserById } from "@/lib/crud";
// Icons
import { PlusIcon, MoreHorizontal } from "lucide-react";
// Action
import { Add, Update, Delete } from "@/actions/user/achievement";
import { Button } from "@/components/ui/button";

export async function AchievementCard(){
    const session = await auth();
    const user = await GetUserById(`${session?.user?.id}`);
    return(
        <CardContainer
        title="Manage Achievement(s)"
        description="Review and Manage Your List of achievements Here."
        className="relative"
        hasLogo={false}>
            <CardContent className="space-y-4">
                {user?.achievements.length !== 0 && user?.achievements.map((achievement) => (
                    <List dateStarted={achievement.dateAchieved} key={achievement.id}>
                        <span>{achievement.name}</span>
                        <span className="text-muted-foreground/60">{achievement.description}</span>
                        {/* Update */}
                        <DialogContainer
                        title="Update Item"
                        description="Make changes to your achievement item."
                        trigger={ <MoreHorizontal className="w-8 h-8 absolute top-4 right-4 cursor-pointer"/> }>
                            <DialogContainerContent>
                                <Form action={ Update }>
                                    <input type="hidden" name="id" defaultValue={achievement.id}/>
                                    <input type="hidden" name="userId" defaultValue={user.id}/>
                                    <FormField label="Achievement name" type="text" name="name" defaultValue={achievement.name}/>
                                    <FormField label="Date achieved" type="date" name="dateAchieved" defaultValue={achievement.dateAchieved.toISOString().slice(0, 10)}/>
                                    <TextareaLabel name="description" label="Description" defaultValue={`${achievement.description}`}/>
                                    <FormSubmit className="w-full">Update</FormSubmit>
                                </Form>
                                {/* Delete */}
                                <DialogContainer
                                title="Are you sure you want to delete this item?"
                                description="Make changes to your achievement item."
                                trigger={ <Button className="w-full" variant="destructive">Delete</Button> }>
                                    <DialogContainerContent>
                                        <Form action={ Delete }>
                                            <input type="hidden" name="id" defaultValue={achievement.id}/>
                                            <input type="hidden" name="userId" defaultValue={user.id}/>
                                            <FormSubmit className="w-full">Delete</FormSubmit>
                                        </Form>
                                    </DialogContainerContent>
                                </DialogContainer>
                            </DialogContainerContent>
                        </DialogContainer>
                    </List>
                ))}
                {user?.achievements.length == 0 && <p className="text-muted-foreground/80">No achievements added yet!</p>}
            </CardContent>
            <DialogContainer 
            title="Add Achievement"
            description="Record Your achievement Journey"
            trigger={
                <PlusIcon className="w-10 h-10 p-2 rounded-full bg-accent absolute top-6 right-6 cursor-pointer text-accent-foreground"/>
            }>
                {/* Add */}
                <DialogContainerContent>
                    <Form action={Add}>
                    <FormField type="hidden" name="userId" value={user?.id} />
                    <FormField label="Achievement name" type="text" name="name" />
                    <FormField label="Date achieved" type="date" name="dateAchieved" />
                    <TextareaLabel name="description" label="Description"/>
                    <FormSubmit className="w-full">Add</FormSubmit>
                    </Form>
                </DialogContainerContent>
            </DialogContainer>
        </CardContainer>
    )
};