import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "codewithjehan@gmail.com",
        pass: "wntg ctzu aliy aeyd"
    }
  });