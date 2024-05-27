import {
    CardContainer, CardContent 
} from "@/components/compile/card";
import {
    Form, FormControl, FormField, FormSubmit, FormNavigateTo, FormFieldParams
} from "@/components/compile/form";
import { VerifyEmail } from "@/actions/authentications/verify-email";
export default function VerifyEmailPage(){
   return(
       <CardContainer
       title="UNI DE DAGUPAN | VERIFY EMAIL"
       description="Gain exclusive access to our campus's professional networking platform. Connect with alumni, industry professionals, explore job opportunities, and showcase achievements in one hub."
       className="w-[600px]">
           <CardContent>
               <Form action={ VerifyEmail }>
                   <FormField label="Email" type="email" name="email" placeholder="School email"/>
                   <FormFieldParams parameter="token" name="token"/>
                   <FormSubmit className="w-full">Verify</FormSubmit>
                   <FormNavigateTo href="/signin">
                        Already verified?
                   </FormNavigateTo>
               </Form>
           </CardContent>
       </CardContainer>
   );
};