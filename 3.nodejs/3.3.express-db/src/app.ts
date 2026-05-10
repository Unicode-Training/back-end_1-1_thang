import "dotenv/config";
import express from "express";
import indexRouter from "./routes";
import {
  errorHandling,
  notFoundHandling,
} from "./middlewares/errorHandling.middleware";
const app = express();
const PORT = 3000;
app.use(express.static(process.cwd() + "/public"));
// app.use("/storage", express.static(process.cwd() + "/uploads"));

//parse body
app.use(express.json()); //json
app.use(express.urlencoded()); //x-www-urlencoded

// app.use(loggingMiddleware);

app.use("/api", indexRouter);

//Not found
app.use(notFoundHandling);

//Global Error Handling
app.use(errorHandling);

//Ví dụ: template tags
// const doSomething = (input: any, values: any) => {
//   console.log(input);
//   console.log(values);
// };
// const a = 10;
// doSomething`Abc: ${a}`;

app.listen(PORT, () => {
  console.log(`Đang chạy với port ${PORT}`);
});

//method:
// - get
// - post
// - put
// - patch
// - delete

// Request --> Middleware --> Route --> Middleware --> Controller
