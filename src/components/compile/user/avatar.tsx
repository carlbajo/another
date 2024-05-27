import {
    CardContainer, CardContent
} from "@/components/compile/card";
import {
    DialogContainer, DialogContainerContent, DialogClose
} from "@/components/compile/dialog";
import {
    Form, FormField, FormSubmit, FormNavigateTo, FormControl
} from "@/components/compile/form";
import {
    Avatar, AvatarImage, AvatarFallback
} from "@/components/ui/avatar";
import { User2, CameraIcon, Quote, Cog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TextareaLabel } from "@/components/ui/textarea";
// User
import { auth } from "@/auth";
import { GetUserById } from "@/lib/crud";
// Server
import { Avatar as Actions } from "@/actions/user/avatar";
import { UpdateUser } from "@/actions/user/user";

export async function AvatarCard(){
    const session = await auth();
    const user = await GetUserById(`${session?.user?.id}`);
    return(
        <CardContainer
        title="Profile"
        description="Delve Into a Comprehensive Overview of Your Profile with Detailed Insights and Analytics"
        className="relative"
        hasLogo={false}>
            <CardContent className="space-y-5">
                {/* Avatar Image */}
                <div className="relative w-fit">
                    <Avatar className="w-20 h-20">
                        <AvatarImage src={`${user?.image}`} alt="Avatar" />
                        <AvatarFallback>
                            <User2 className="w-10 h-10"/>
                        </AvatarFallback>
                    </Avatar>
                    {/* DIALOG / FORM */}
                    <DialogContainer
                    title="Change your Avatar"
                    description="Personalize Your Online Identity: Effortlessly Customize Your Avatar to Reflect Your Unique Style and Personality"
                    trigger={
                        <CameraIcon className="w-8 h-8 absolute bottom-0 right-0 bg-accent p-1 text-accent-foreground rounded-full cursor-pointer"/>
                    }>
                        <DialogContainerContent>
                            <Form action={Actions}>
                                <FormField type="hidden" name="id" value={`${user?.id}`}/>
                                <FormField type="file" name="image" accept="image/jpeg, image/png"/>
                                <FormSubmit className="w-full">Update</FormSubmit>
                                <DialogClose asChild>
                                    <Button variant="ghost" className="w-full">Cancel</Button>
                                </DialogClose>
                            </Form>
                        </DialogContainerContent>
                    </DialogContainer>
                </div>
                {/* Details */}
                <div>
                    <h2 className="text-3xl font-semibold leading-none tracking-tight pb-3">
                        {`${user?.firstName} ${user?.lastName}`}
                    </h2>
                    <div className="space-y-1">
                        <p className="text-muted-foreground">
                            {`${user?.course?.name}`}
                        </p>
                        <p className="text-muted-foreground">
                            {user?.city && `${user.city}, `}
                            {user?.country && `${user.country}`}
                        </p>
                        <p className="text-muted-foreground">
                            {user?.birthdate && `${user.birthdate.toISOString().slice(0, 10)}, `}
                        </p>
                    </div>
                    {/* bio */}
                    <blockquote className="bg-muted p-2 italic font-semibold flex gap-3 mt-3">
                        <Quote className="w-12 h-12"/>
                        {user?.bio ? (
                            <p>{`${user?.bio}`}</p>
                        ): (
                            <p>No bio added yet!</p>
                        )}
                    </blockquote>
                </div>
            </CardContent>
            <DialogContainer
            title="Update Personal Data"
            description="Hey, it's time to give your profile a refresh!"
            trigger={
                <Cog className="w-10 h-10 rounded-full absolute top-6 right-6 cursor-pointer bg-accent text-accent-foreground p-2"/> 
            }>
                <DialogContainerContent>
                    {/* TODO */}
                    <Form action={UpdateUser}>
                        <input type="hidden" value={user?.id} name="id" />
                        <FormControl>
                            <FormField label="First Name"
                            type="text" name="firstName" 
                            defaultValue={user?.firstName}/>
                            <FormField label="Last Name"
                            type="text" name="lastName" 
                            defaultValue={user?.lastName}/>
                        </FormControl>
                        <FormControl>
                            <FormField label="Middle Name"
                            type="text" name="middleName" 
                            defaultValue={`${user?.middleName}`}/>
                            <FormField label="Birthdate" 
                            type="date" name="birthdate"
                            defaultValue={`${user?.birthdate?.toISOString().slice(0, 10)}`}/>
                        </FormControl>
                        <FormControl>
                            <FormField label="Personal Email"
                            type="text" name="personalEmail" 
                            defaultValue={`${user?.personalEmail}`}/>
                            <FormField label="Phone Number" 
                            type="text" name="phoneNumber" 
                            defaultValue={`${user?.phoneNumber}`}/>
                        </FormControl>
                        <FormControl>
                            <FormField label="City"
                            type="text" name="city" 
                            defaultValue={`${user?.city}`}/>
                            <FormField label="Province" 
                            type="text" name="province" 
                            defaultValue={`${user?.province}`}/>
                        </FormControl>
                        <FormControl>
                            <FormField label="Country"
                            type="text" name="country" 
                            defaultValue={`${user?.country}`}/>
                            <FormField label="School ID" 
                            type="text" name="schoolId" 
                            defaultValue={`${user?.schoolId}`}/>
                        </FormControl>
                        <TextareaLabel label="Biography" name="bio" defaultValue={`${user?.bio}`}/>
                        <FormSubmit className="w-full sticky bottom-0 left-0">Update</FormSubmit>
                        <DialogClose asChild>
                           <Button variant="secondary" className="w-full">Cancel</Button> 
                        </DialogClose>
                    </Form>
                </DialogContainerContent>
            </DialogContainer>
        </CardContainer>
    );
};