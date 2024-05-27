import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import nodemailer from "nodemailer";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function FormatError(error: string){
  const formatted = error.split(";").map((error) => {
    if(error.startsWith('Validation error:')){
      const phase1 = error.split(":")[1].trim();
      return phase1.split(`at "`)[0].trim();
    }
    return error.split(`at "`)[0].trim();
  });
  return formatted;
};
