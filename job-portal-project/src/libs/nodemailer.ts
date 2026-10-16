import nodemailer from "nodemailer";
export const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST as string,
    port: +process.env.MAIL_PORT!,
    secure: process.env.MAIL_PORT === '465', // use STARTTLS (upgrade connection to TLS after connecting)
    auth: {
        user: process.env.MAIL_USERNAME as string,
        pass: process.env.MAIL_PASSWORD as string,
    },
});