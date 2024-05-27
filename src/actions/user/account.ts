"use server";
import z from "zod";
// HELPER
import { isMatch } from "@/lib/helper";
import { FormatError } from "@/lib/utils";
import { fromError } from "zod-validation-error";
import { UpdateSchema } from "../validations/compiled";
// Database
import {
     GetUserByEmail, CreateEmailToken 
} from "@/lib/crud";
import { transporter } from "@/lib/email";
import bcryptjs from "bcryptjs";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function UpdateAccount(
    state: { message: string },
    formData: FormData
){
    const rawFormData = Object.fromEntries(formData);
    const formValid = UpdateSchema.safeParse(rawFormData);
    if(!formValid.success){
        const error = FormatError(fromError(formValid.error).message);
        return { message:  error[0]};
    };
    let { email, password, confirmPassword, courseId, privacy, affiliationId } = formValid.data;
    const courseExist = await prisma.course.findFirst({
        where: { id: courseId },
    })
    const affiliationExist = await prisma.affiliations.findFirst({
        where: { id: affiliationId }
    });
    if(!affiliationExist){
        return { message: "Program do not exist!" }
    }
    if(!courseExist){
        return { message: "Course do not exist!" }
    }
    if(password !== confirmPassword){
        return { message: "Password do not match" };
    }
    const user = await GetUserByEmail(email);
    if(!user){
        return { message: "Account do not exist!" };
    }
    if(password) {
        const passwordIsMatch = await bcryptjs.compare(
            password, user.password
        );
        return { message: "Old and new password are the same!" };
    }
    if(!password){
        password = user.password
    }else {
        password = await bcryptjs.hash(password, 10);
    }
    const preferences = await prisma.preference.findFirst({
        where: { userId: user.id }
    });
    // Update
    await prisma.user.update({
        where: { id: user.id },
        data: {
            password, courseId, affiliations: {
                connect: { id: affiliationId },
            }
        },
    });
    await prisma.preference.update({
        where: { id: preferences?.id },
        data: {
             privacy: privacy as "PUBLIC" | "PRIVATE"
        },
    });
    if(user.email !== email){
        if(user.emailVerified){
            await prisma.user.update({
                where: { id: user.id },
                data: { emailVerified: null }
            });
             // Generate token
            const token = await CreateEmailToken(email, password);
            await transporter.sendMail({
                from: "codewithjehan@gmail.com",
                to: email,
                subject: "UDD | Verify your email",
                text: "Click the link to reset your password!",
                html: `<a href="http://localhost:3000/verify-email?token=${token.token}">Verify email</a>`,
            });
            return { message: "Email verification successfully sent." };
        }
    }
    revalidatePath("/");
    return { message: "Updated successfully." };
};
