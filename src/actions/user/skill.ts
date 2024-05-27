"use server";
import { FormatError } from "@/lib/utils";
import { fromError } from "zod-validation-error";
import { SkillSchema } from "../validations/compiled";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
export async function Add(
    state: { message: string },
    formData: FormData
){
    const rawFormData = Object.fromEntries(formData);
    const formValid = SkillSchema.safeParse(rawFormData);
    if(!formValid.success){
        const error = FormatError(fromError(formValid.error).message);
        return { message:  error[0]};
    };
    const { userId, skillId } = formValid.data;
    await prisma.user.update({
        where: { id: userId },
        data: {
            skill: {
                connect: { id: skillId },
            }
        }
    });
    revalidatePath("/");
    return { message: "Skill added successfully." };
}