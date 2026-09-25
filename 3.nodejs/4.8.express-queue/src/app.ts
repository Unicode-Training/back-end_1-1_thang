import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { ErrorWithStatus } from "./types/error.type";
import indexRouter from "./routes/route.index";
// import { authService } from "./services/auth.service";
const app = express();
const PORT = process.env.PORT || 3000;

//Middleware
app.use(express.json());
app.use(cors());
app.use('/api', indexRouter);

app.use((err: ErrorWithStatus, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || 500;
    const isProduction = process.env.NODE_ENV === "production";
    const message = isProduction ? "Internal Server Error" : err.message
    return res.status(status).json({
        success: false,
        error: message
    })
});

// authService.revokeByUser(1);

app.listen(PORT, () => {
    console.log('Chạy với cổng ' + PORT);
})