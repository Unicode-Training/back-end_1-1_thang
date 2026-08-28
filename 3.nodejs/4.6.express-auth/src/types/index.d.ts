import { User } from "../prisma/generated/prisma/client";
import { Request, Express } from 'express'
declare global {
    export namespace Express {
        export interface Request {
            user?: User;
            jti?: string;
            expired?: number;
        }
    }
} 
