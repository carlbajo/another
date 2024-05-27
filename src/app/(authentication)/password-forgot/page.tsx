import {
    CardContainer, CardContent 
} from "@/components/compile/card";
import {
    Form, FormControl, FormField, FormSubmit, FormNavigateTo, FormFieldParams
} from "@/components/compile/form";
import { PasswordForgot } from "@/actions/authentications/password-forgot";
export default function PasswordForgotPage(){
   return(
       <CardContainer
       title="UNI DE DAGUPAN | FORGOT PASSWORD"
       description="Gain exclusive access to our campus's professional networking platform. Connect with alumni, industry professionals, explore job opportunities, and showcase achievements in one hub."
       className="w-[600px]">
           <CardContent>
               <Form action={ PasswordForgot }>
                   <FormField label="Email" type="email" name="email" placeholder="School email"/>
                   <FormSubmit className="w-full">Send password reset link</FormSubmit>
                   <FormNavigateTo href="/signin">
                        Go back to signin?
                   </FormNavigateTo>
               </Form>
           </CardContent>
       </CardContainer>
   );
};