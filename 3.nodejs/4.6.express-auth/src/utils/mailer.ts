import nodemailer from "nodemailer";
import ejs from "ejs";
const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST as string,
    port: +process.env.MAIL_PORT!,
    secure: process.env.MAIL_PORT === '465', // use STARTTLS (upgrade connection to TLS after connecting)
    auth: {
        user: process.env.MAIL_USERNAME as string,
        pass: process.env.MAIL_PASSWORD as string,
    },
});

export const sendMail = async (to: string, subject: string, html: string) => {
    const info = await transporter.sendMail({
        from: '"Unicode Academy" <anhoang.unicode@gmail.com>', // sender address
        to,
        subject,
        html
    });
    return info;
}

export const sendMailWithTemplate = async <T>(to: string, subject: string, template: string, context?: T) => {
    const templatePath = process.cwd() + '/src/mail/' + template + '.ejs';
    const html = await ejs.renderFile(templatePath, context!);
    return sendMail(to, subject, html);
}