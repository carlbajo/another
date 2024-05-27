import {
     CardContainer, CardContent 
} from "@/components/compile/card";
import {
     Form, FormControl, FormField, FormSubmit, FormNavigateTo
} from "@/components/compile/form";
import { Signin } from "@/actions/authentications/signin";
export default function SigninPage(){
    return(
        <CardContainer
        title="UNI DE DAGUPAN | SIGNIN"
        description="Gain exclusive access to our campus's professional networking platform. Connect with alumni, and showcase achievements in one hub."
        className="w-[600px]">
            <CardContent>
                <Form action={ Signin }>
                    <FormField label="Email" type="email" name="email" placeholder="School email"/>
                    <FormField label="Password" type="password" name="password" placeholder="Password"/>
                   <FormNavigateTo href="/password-forgot">
                        Forgot password?
                   </FormNavigateTo>
                    <FormSubmit className="w-full">Signin</FormSubmit>
                    <FormNavigateTo href="/signup">
                        Do not have an account?
                   </FormNavigateTo>
                </Form>
            </CardContent>
        </CardContainer>
    );
};