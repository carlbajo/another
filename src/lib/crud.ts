import prisma from "@/lib/prisma";
import { v4 } from "uuid";

export async function GetUserById( id: string ){
    const data = await prisma.user.findUnique({
        where: { id }, 
        include: { educations: true, projects: true, achievements: true, skill: true, course: true, preferences: true  }  
    });
    return data;
};
export async function GetUserByEmail( email: string ){
    const data = await prisma.user.findUnique({ where: { email } });
    return data;
};

export async function GetEmailTokenByToken( token: string ){
    const data = await prisma.emailToken.findFirst({ where: { token } });
    return data;
};
export async function GetEmailTokenByEmail( email: string ){
    const data = await prisma.emailToken.findFirst({ where: { email } });
    return data;
};

export async function GetPasswordTokenByToken( token: string ){
    const data = await prisma.passwordToken.findFirst({ where: { token } });
    return data;
};
export async function GetPasswordTokenByEmail( email: string ){
    const data = await prisma.passwordToken.findFirst({ where: { email } });
    return data;
};

// Token Creation
export async function CreateEmailToken(email: string, password: string){
    const token = v4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const tokenExist = await GetEmailTokenByEmail(email);
    if(tokenExist){
        await prisma.emailToken.delete({where: { id: tokenExist.id }});
    };

    const newToken = await prisma.emailToken.create({
        data: { email, token, expires, password }
    });

    return newToken;
};

export async function CreatePasswordToken(email: string){
    const token = v4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const tokenExist = await GetPasswordTokenByEmail(email);
    if(tokenExist){
        await prisma.passwordToken.delete({where: { id: tokenExist.id }});
    };

    const newToken = await prisma.passwordToken.create({
        data: { email, token, expires }
    });
    return newToken;
};

// Some queries

export async function GetAvatarById(id: string){
    const avatar = await prisma.user.findUnique({
        where: { id },
        select: { image: true, firstName: true, lastName: true }
    });
    return avatar;
};

export async function GetPredefinedSkills(){
    const skills = await prisma.skill.findMany();
    return skills;
};

export async function GetPredefinedCourse(){
    const course = await prisma.course.findMany();
    return course;
};

export async function GetPredefinedAffiliations(){
    const affiliations = await prisma.affiliations.findMany();
    return affiliations;
};