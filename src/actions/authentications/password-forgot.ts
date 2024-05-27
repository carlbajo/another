"use server";
// HELPER
import { FormatError } from "@/lib/utils";
import { fromError } from "zod-validation-error";
import { 
    GetUserByEmail, 
    CreatePasswordToken 
} from "@/lib/crud";
import { PasswordforgotSchema } from "../validations/compiled";
import { transporter } from "@/lib/email";

export async function PasswordForgot(
    state: { message: string },
    formData: FormData
){
    const rawFormData = Object.fromEntries(formData);
    // VALIDATION
    const isValid = PasswordforgotSchema.safeParse(rawFormData);
    if(!isValid.success){
        const error = FormatError(fromError(isValid.error).message);
        return { message:  error[0]};
    };
    // DESTRUCTURED
    const { email } = isValid.data;
    // CHECK IF USER EXIST
    const userExist = await GetUserByEmail(email);
    if(!userExist){
        return { message: "Account do not exist!" };
    };
    // CREATE A PASSWORD TOKEN
    const token = await CreatePasswordToken(email);
    // SEND THE TOKEN
    await transporter.sendMail({
        from: "codewithjehan@gmail.com",
        to: email,
        subject: "UDD | Forgot Password",
        text: "Click the link to reset your password!",
        html: `<a href="http://localhost:3000/password-reset?token=${token.token}">Reset Password</a>`,
    });
    return { message: "Password Reset Link has been successfully sent." }
};