"use server";
import { fromError } from "zod-validation-error";
// HELPERS
import { isMatch } from "@/lib/helper";
import { FormatError } from "@/lib/utils";
import { 
    GetPasswordTokenByToken, GetUserByEmail
} from "@/lib/crud";
import { PasswordresetSchema } from "../validations/compiled";
// DATABASE
import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";

export async function PasswordReset(
    state: { message: string },
    formData: FormData
){
    const rawFormData = Object.fromEntries(formData);
    // VALIDATION
    const isValid = PasswordresetSchema.safeParse(rawFormData);
    if(!isValid.success){
        const error = FormatError(fromError(isValid.error).message);
        return { message:  error[0]};
    };
    const { token, password } = isValid.data;
    // Check if token exist
    const tokenExist = await GetPasswordTokenByToken(token);
    if(!tokenExist){
        return { message: "Token do not exist!" };
    }
    // Check if user exist
    const userExist = await GetUserByEmail(tokenExist.email);
    if(!userExist){
        return { message: "Account do not exist!" };
    };
    // Check if expired
    if(new Date(tokenExist.expires) < new Date()){
        return { message: "Token has already expired!" };
    }
    // Hashed the new password
    const hashed = await bcryptjs.hash(password, 10);
    // Update the user email verified table
    await prisma.user.update({
        where: { id: userExist.id },
        data: { password: hashed },
    });
    // Delete the token
    await prisma.passwordToken.delete({
        where: { id: tokenExist.id },
    });
    return { message: "Your password has been reset." };

};