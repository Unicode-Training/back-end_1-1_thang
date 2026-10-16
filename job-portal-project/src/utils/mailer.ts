import ejs from "ejs";
import type { SentMessageInfo } from "nodemailer";
import { transporter } from "../libs/nodemailer";
export const sendMail = async (to: string, subject: string, html: string): Promise<SentMessageInfo> => {
    const fromName = process.env.MAIL_FROM_NAME;
    const fromEmail = process.env.MAIL_FROM;
    const info = await transporter.sendMail({
        from: `"${fromName}" <${fromEmail}>`,
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