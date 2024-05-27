import {
    CardContainer, CardContent
} from "@/components/compile/card";
import {
    Form, FormControl, FormField, FormSubmit, FormNavigateTo
} from "@/components/compile/form";
import { 
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { UpdateAccount } from "@/actions/user/account";
import { Affiliation } from "./affiliations";
// AuthJS
import { auth } from "@/auth";
import { GetPredefinedAffiliations, GetPredefinedCourse, GetUserById } from "@/lib/crud";
export async function AccountCard(){
    const session = await auth();
    const user = await GetUserById(`${session?.user?.id}`);
    const courses = await GetPredefinedCourse();
    const affiliations = await GetPredefinedAffiliations();
    return(
        <CardContainer
        title="Manage Account"
        description="Do not enter any type of credit or your private credentials!">
            <CardContent>
                <Form action={ UpdateAccount }>
                    <FormField label="Email" type="email" name="email" defaultValue={user?.email}/>
                    <FormField label="Password" type="password" name="password" placeholder="Password"/>
                    <FormField label="Confirm Password" type="password" name="confirmPassword" placeholder="Confirm password"/>
                    <FormControl>
                        <div className="grid gap-3 w-full">
                            <Label>Privacy</Label>
                            <Select name="privacy" defaultValue={user?.preferences?.privacy}>
                                <SelectTrigger>
                                    <SelectValue placeholder={user?.preferences?.privacy}/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="PUBLIC">Public</SelectItem>
                                    <SelectItem value="PRIVATE">Private</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-3 w-full">
                            <Label>Course</Label>
                            <Select name="courseId" defaultValue={user?.course?.id}>
                                <SelectTrigger>
                                    <SelectValue placeholder="options here"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {courses.map(item => (
                                        <SelectItem value={item.id}>{item.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-3 w-full">
                            <Label>Membership</Label>
                            <Select name="affiliationId">
                                <SelectTrigger>
                                    <SelectValue placeholder="options here"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {affiliations.map(affiliation => (
                                            <SelectItem value={affiliation.id}>{affiliation.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </FormControl>
                    <FormSubmit className="w-full">Update</FormSubmit>
                </Form>
            </CardContent>
        </CardContainer>
    );
};