"use server";
import z from "zod";
// HELPER
import { VerifyemailSchema } from "../validations/compiled";
// DATABASE
import { 
    GetUserByEmail, GetEmailTokenByToken
} from "@/lib/crud";
import { FormatError } from "@/lib/utils";
import { fromError } from "zod-validation-error";
import { signIn } from "@/auth";
import prisma from "@/lib/prisma";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export async function VerifyEmail(
    state: { message: string },
    formData: FormData
){
    const rawFormData = Object.fromEntries(formData);
     // VALIDATION
     const isValid = VerifyemailSchema.safeParse(rawFormData);
    if(!isValid.success){
        const error = FormatError(fromError(isValid.error).message);
        return { message:  error[0]};
    };
    const { email, token } = isValid.data;
    // Check if user exist
    const userExist = await GetUserByEmail(email);
    if(!userExist){
        return { message: "Account do not exist!" };
    };
    // Check if token exist
    const tokenExist = await GetEmailTokenByToken(token);
    if(!tokenExist){
        return { message: "Token do not exist!" };
    }
    // Check if expired
    if(new Date(tokenExist.expires) < new Date()){
        return { message: "Token has already expired!" };
    }
    // Update the user email verified table
    await prisma.user.update({
        where: { id: userExist.id },
        data: { emailVerified: new Date(), email: tokenExist.email },
    });
    // Delete the token
    await prisma.emailToken.delete({
        where: { id: tokenExist.id },
    });

    try {
        await signIn("credentials", {
            email, password: tokenExist.password, redirectTo: "/"
        });
        redirect("/");
    }catch(error) {
        if(error instanceof AuthError){
            switch (error.type){
                case "CredentialsSignin":
                    return {message: "Invalid credentials!"}
                default:
                    return {message: "Something went wrong!"}
            }
        }
        throw error;
    }
};