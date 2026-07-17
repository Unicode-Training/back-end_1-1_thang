import express, { Request, Response } from "express";
const app = express();
const PORT = process.env.PORT || 3000;
app.get('/', (req: Request, res: Response) => {
    res.json({});
})

app.listen(PORT, () => {
    console.log(`Đang chạy với port: ${PORT}`);
});