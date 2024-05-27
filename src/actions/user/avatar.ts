"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import fs from "node:fs";

export async function Avatar(
    state: { message: string },
    formData: FormData,
){
    const rawFormData = Object.fromEntries(formData);
    let { image, id } = rawFormData;
    const file = image as File;
    const extension = file.name.split(".").pop();
    if(extension === "undefined"){
        return { message: "Image is invalid!" };
    }
    const fileName = `${id}.${extension}`;
    const stream = fs.createWriteStream(`public/avatar/${fileName}`);
    const bufferedImage = await file.arrayBuffer();
    stream.write(Buffer.from(bufferedImage), (err) => {
        if(err){
            return { message: "Something went wrong!" };
        }
    });
    image = `/avatar/${fileName}`;
    await prisma.user.update({
        where: { id: `${id}` },
        data: { image }
    });
    revalidatePath("/");
    return { message: "success bro." };
};