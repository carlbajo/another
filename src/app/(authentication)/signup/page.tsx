import {
    CardContainer, CardContent 
} from "@/components/compile/card";
import {
    Form, FormControl, FormField, FormSubmit, FormNavigateTo
} from "@/components/compile/form";
import { Signup } from "@/actions/authentications/signup";
import { 
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { GetPredefinedCourse } from "@/lib/crud";
export default async function SignupPage(){
    const courses = await GetPredefinedCourse();
   return(
       <CardContainer
       title="UNI DE DAGUPAN | SIGNUP"
       description="Gain exclusive access to our campus's professional networking platform. Connect with alumni, industry professionals, explore job opportunities, and showcase achievements in one hub."
       className="w-[600px]">
           <CardContent>
               <Form action={ Signup }>
                   <FormControl>
                       <FormField label="First Name" type="text" name="firstName" placeholder="First name"/>
                       <FormField label="Last Name" type="text" name="lastName" placeholder="Last name"/>
                   </FormControl>
                   <FormField label="Email" type="email" name="email" placeholder="School email"/>
                   <FormControl>
                        <FormField label="Password" type="password" name="password" placeholder="Password"/>
                        <FormField label="Confirm Password" type="password" name="confirmPassword" placeholder="Confirm password"/>
                   </FormControl>
                   <div className="grid gap-3 w-full">
                        <Label>Select Course</Label>
                        <Select name="courseId">
                            <SelectTrigger className="">
                            <SelectValue placeholder="Options here"/>
                            </SelectTrigger>
                            <SelectContent>
                                {courses.map((course) => (
                                <SelectItem value={course.id}>{course.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                   <FormSubmit className="w-full">Signup</FormSubmit>
                   <FormNavigateTo href="/signin">
                        Have an account?
                   </FormNavigateTo>
               </Form>
           </CardContent>
       </CardContainer>
   );
};