import {
    CardContainer, CardContent 
} from "@/components/compile/card";
import {
    Form, FormControl, FormField, FormSubmit, FormNavigateTo, FormFieldParams
} from "@/components/compile/form";
import { PasswordReset } from "@/actions/authentications/password-reset";
export default function PasswordResetPage(){
   return(
       <CardContainer
       title="UNI DE DAGUPAN | RESET PASSWORD"
       description="Gain exclusive access to our campus's professional networking platform. Connect with alumni, industry professionals, explore job opportunities, and showcase achievements in one hub."
       className="w-[600px]">
           <CardContent>
               <Form action={ PasswordReset }>
                   <FormField label="New Password" type="password" name="password" placeholder="Password"/>
                   <FormField label="Confirm Password" type="password" name="confirmPassword" placeholder="Confirm Password"/>
                   <FormFieldParams parameter="token" name="token"/>
                   <FormSubmit className="w-full">Reset</FormSubmit>
                   <FormNavigateTo href="/signin">
                        Go back to signin?
                   </FormNavigateTo>
               </Form>
           </CardContent>
       </CardContainer>
   );
};