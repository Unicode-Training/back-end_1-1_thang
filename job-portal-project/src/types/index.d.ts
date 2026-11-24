import { User } from "../prisma/generated/prisma/client";
declare global {
    export namespace Express {
        export interface Request {
            user?: Omit<User, 'password'>;
            jti?: string;
            expired?: number;
            companyId?: number;
        }
    }
} 
