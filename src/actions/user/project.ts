"use server";
import z from "zod";
// HELPERS
import { isEmpty } from "@/lib/helper";
import { FormatError } from "@/lib/utils";
import { fromError } from "zod-validation-error";
import {
     AddProjectSchema, UpdateProjectSchema, DeleteProjectSchema
} from "../validations/compiled";
// Database
import { GetUserById } from "@/lib/crud";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

export async function Add(
    state: { message: string },
    formData: FormData
){
    const rawFormData = Object.fromEntries(formData);
    console.log(rawFormData)
    // Check if form is valid!
    const isValid = AddProjectSchema.safeParse(rawFormData);
    if(!isValid.success){
        const error = FormatError(fromError(isValid.error).message);
        console.log(error)
        return { message:  error[0]};
    };
    const { userId, ...form } = isValid.data;
    // Check if user exist!
    const userExist = await GetUserById(userId);
    if(!userExist){
        return { message: "Account do not exist!" };
    };
    // Add the data
    await prisma.project.create({
        data: { userId, ...form },
    });
    revalidatePath("/");
    return { message: "Project added successfully." };

};

export async function Update(
    state: { message: string },
    formData: FormData
){
    const rawFormData = Object.fromEntries(formData);
    // Check if form is valid!
    const isValid = UpdateProjectSchema.safeParse(rawFormData);
    if(!isValid.success){
        const error = FormatError(fromError(isValid.error).message);
        return { message:  error[0]};
    };
    const { id, userId, ...form } = isValid.data;
    // Check if user exist!
    const userExist = await GetUserById(userId);
    if(!userExist){
        return { message: "Account do not exist!" };
    };
    // Update the data
    await prisma.project.update({
        where: { id },
        data: { ...form },
    });
    revalidatePath("/");
    return { message: "Project updated successfully." };

};

export async function Delete(
    state: { message: string },
    formData: FormData
){
    const rawFormData = Object.fromEntries(formData);
    // Check if form is valid!
    const isValid = DeleteProjectSchema.safeParse(rawFormData);
    if(!isValid.success){
        const error = FormatError(fromError(isValid.error).message);
        return { message:  error[0]};
    };
    const { id, userId } = isValid.data;
    // Check if user exist!
    const userExist = await GetUserById(userId);
    if(!userExist){
        return { message: "Account do not exist!" };
    };
    // Delete the data
    await prisma.project.delete({
        where: { id, userId },
    });
    revalidatePath("/");
    return { message: "Project deleted successfully." };

};