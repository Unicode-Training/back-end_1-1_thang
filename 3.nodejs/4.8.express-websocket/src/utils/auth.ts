import crypto from "crypto";
export const generateOtp = () => crypto.randomInt(100000, 1000000).toString();

export const md5 = (input: string) => crypto.createHash('md5').update(input).digest('hex')