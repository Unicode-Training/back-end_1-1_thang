import express from "express";
import cors from "cors";
import "dotenv/config";
import indexRouter from "./routes/index.route";
import authRouter from "./routes/auth.route";
import employerRouter from "./routes/employer.route";
import uploadRouter from "./routes/upload.route";
import "./socket/index";
import "./subscribe/index.subscribe";
import { errorMiddleware, notFoundMiddleware } from "./middlewares/error.middleware";
const app = express();
const PORT = process.env.PORT || 3000;

//Middleware
app.use(express.json());
app.use(cors());

app.use('/storage', express.static(process.cwd() + '/storage'));

app.use('/api', indexRouter);
app.use('/api/auth', authRouter);
app.use('/api/employers', employerRouter);
app.use('/api/uploads', uploadRouter)

app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log('Chạy với cổng ' + PORT);
})