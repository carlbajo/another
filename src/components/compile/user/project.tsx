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
import { Add, Update, Delete } from "@/actions/user/project";
import { Button } from "@/components/ui/button";

export async function ProjectCard(){
    const session = await auth();
    const user = await GetUserById(`${session?.user?.id}`);
    return(
        <CardContainer
        title="Manage Project(s)"
        description="Review and Manage Your List of Projects Here."
        className="relative"
        hasLogo={false}>
            <CardContent className="space-y-4">
                {user?.projects.length !== 0 && user?.projects.map((project) => (
                    <List dateStarted={project.dateCompleted} key={project.id}>
                        <span>{project.name}</span>
                        <span className="text-muted-foreground/60">{project.description}</span>
                        {/* Update */}
                        <DialogContainer
                        title="Update Item"
                        description="Make changes to your project item."
                        trigger={ <MoreHorizontal className="w-8 h-8 absolute top-4 right-4 cursor-pointer"/> }>
                            <DialogContainerContent>
                                <Form action={ Update }>
                                    <input type="hidden" name="id" defaultValue={project.id}/>
                                    <input type="hidden" name="userId" defaultValue={user.id}/>
                                    <FormField label="Project name" type="text" name="name" defaultValue={project.name}/>
                                    <FormField label="Date completed" type="date" name="dateCompleted" defaultValue={project.dateCompleted.toISOString().slice(0, 10)}/>
                                    <TextareaLabel name="description" label="Description" defaultValue={`${project.description}`}/>
                                    <FormSubmit className="w-full">Update</FormSubmit>
                                </Form>
                                {/* Delete */}
                                <DialogContainer
                                title="Are you sure you want to delete this item?"
                                description="Make changes to your project item."
                                trigger={ <Button className="w-full" variant="destructive">Delete</Button> }>
                                    <DialogContainerContent>
                                        <Form action={ Delete }>
                                            <input type="hidden" name="id" defaultValue={project.id}/>
                                            <input type="hidden" name="userId" defaultValue={user.id}/>
                                            <FormSubmit className="w-full">Delete</FormSubmit>
                                        </Form>
                                    </DialogContainerContent>
                                </DialogContainer>
                            </DialogContainerContent>
                        </DialogContainer>
                    </List>
                ))}
                {user?.projects.length == 0 && <p className="text-muted-foreground/80">No projects added yet!</p>}
            </CardContent>
            <DialogContainer 
            title="Add Projects"
            description="Record Your Project Journey"
            trigger={
                <PlusIcon className="w-10 h-10 p-2 rounded-full bg-accent absolute top-6 right-6 cursor-pointer text-accent-foreground"/>
            }>
                {/* Add */}
                <DialogContainerContent>
                    <Form action={Add}>
                    <FormField type="hidden" name="userId" value={user?.id} />
                    <FormField label="Project name" type="text" name="name" />
                    <FormField label="Date completed" type="date" name="dateCompleted" />
                    <TextareaLabel name="description" label="Description"/>
                    <FormSubmit className="w-full">Add</FormSubmit>
                    </Form>
                </DialogContainerContent>
            </DialogContainer>
        </CardContainer>
    )
};