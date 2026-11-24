import "dotenv/config";
import { sendMail } from "../utils/mailer";
sendMail('hoangan.web@gmail.com', 'test', 'test');