"use server";
import z from "zod";
// Helpers
import { isMatch } from "@/lib/helper";
import { FormatError } from "@/lib/utils";
import { fromError } from "zod-validation-error";
import bcryptjs from "bcryptjs";
import prisma from "@/lib/prisma";
import { SignupSchema } from "../validations/compiled";
// Database
import { CreateEmailToken, GetPredefinedCourse } from "@/lib/crud";
import { transporter } from "@/lib/email";

export async function Signup(
    state: { message: string },
    formData: FormData
){
    const rawFormData = Object.fromEntries(formData);
    // VALIDATION
    const isValid = SignupSchema.safeParse(rawFormData);
    if(!isValid.success){
        const error = FormatError(fromError(isValid.error).message);
        return { message:  error[0]};
    }
    const { password, email, confirmPassword, courseId, ...form } = isValid.data;
    const courseExist = await prisma.course.findFirst({
        where: { id: courseId }
    })
    if(!courseExist){
        return { message: "Course do not exist!" };
    }
    const hashed = await bcryptjs.hash(password, 10);
    // Insertion
    await prisma.user.create({
        data: {
             password: hashed, email, courseId, preferences: {
                create: {
                    privacy: "PUBLIC",
                }
             }, ...form 
            },
            include: { preferences: true, course: true }
    });
    // Generate token
    const token = await CreateEmailToken(email, password);
    await transporter.sendMail({
        from: "codewithjehan@gmail.com",
        to: email,
        subject: "UDD | Email Verification",
        text: "Click the link to verify your email!",
        html: `<a href="http://localhost:3000/verify-email?token=${token.token}">Verify email</a>`,
    });
    return { message: "Email verification has been successfully sent to your email." };
};