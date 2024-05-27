import {
    CardContainer, CardContent
} from "@/components/compile/card";
import {
    DialogContainer, DialogContainerContent, DialogClose
} from "@/components/compile/dialog";
import {
    Form, FormControl, FormField, FormSubmit, FormNavigateTo
} from "@/components/compile/form";
import { List } from "@/components/compile/list";
// Sessions
import { auth } from "@/auth";
import { GetUserById } from "@/lib/crud";
// Icons
import { PlusIcon, MoreHorizontal } from "lucide-react";
// Action
import { Add, Update, Delete } from "@/actions/user/education";
import { Button } from "@/components/ui/button";

export async function EducationCard(){
    const session = await auth();
    const user = await GetUserById(`${session?.user?.id}`);
    return(
        <CardContainer
        title="Manage Education(s)"
        description="Review and Manage Your Education Background Information Here."
        className="relative"
        hasLogo={false}>
            <CardContent className="space-y-4">
                {user?.educations.length !== 0 && user?.educations.map((education) => (
                    <List dateStarted={education.dateStarted} key={education.id}>
                        {education.schoolName}
                        {/* Update */}
                        <DialogContainer
                        title="Update Item"
                        description="Make changes to your education item."
                        trigger={ <MoreHorizontal className="w-8 h-8 absolute top-4 right-4 cursor-pointer"/> }>
                            <DialogContainerContent>
                                <Form action={ Update }>
                                    <input type="hidden" name="id" defaultValue={education.id}/>
                                    <input type="hidden" name="userId" defaultValue={user.id}/>
                                    <FormField label="School name" type="text" name="schoolName" defaultValue={education.schoolName}/>
                                    <FormControl>
                                        <FormField label="Date started" type="date" name="dateStarted" defaultValue={education.dateStarted.toISOString().slice(0, 10)}/>
                                        <FormField label="Date started" type="date" name="dateEnded" defaultValue={education.dateEnded?.toISOString().slice(0, 10)}/>
                                    </FormControl>
                                    <FormSubmit className="w-full">Update</FormSubmit>
                                </Form>
                                {/* Delete */}
                                <DialogContainer
                                title="Are you sure you want to delete this item?"
                                description="Make changes to your education item."
                                trigger={ <Button className="w-full" variant="destructive">Delete</Button> }>
                                    <DialogContainerContent>
                                        <Form action={ Delete }>
                                            <input type="hidden" name="id" defaultValue={education.id}/>
                                            <input type="hidden" name="userId" defaultValue={user.id}/>
                                            <FormSubmit className="w-full">Delete</FormSubmit>
                                        </Form>
                                    </DialogContainerContent>
                                </DialogContainer>
                            </DialogContainerContent>
                        </DialogContainer>
                    </List>
                ))}
                {user?.educations.length == 0 && <p className="text-muted-foreground/80">No educations added yet!</p>}
            </CardContent>
            <DialogContainer 
            title="Add education history"
            description="Record Your Academic Journey"
            trigger={
                <PlusIcon className="w-10 h-10 p-2 rounded-full bg-accent absolute top-6 right-6 cursor-pointer text-accent-foreground"/>
            }>
                {/* Add */}
                <DialogContainerContent>
                    <Form action={Add}>
                    <FormField type="hidden" name="userId" value={user?.id} />
                        <FormField label="School name" type="text" name="schoolName" />
                        <FormControl>
                            <FormField label="Date started" type="date" name="dateStarted" />
                            <FormField label="Date ended" type="date" name="dateEnded" />
                        </FormControl>
                        <FormSubmit className="w-full">Add</FormSubmit>
                    </Form>
                </DialogContainerContent>
            </DialogContainer>
        </CardContainer>
    )
};