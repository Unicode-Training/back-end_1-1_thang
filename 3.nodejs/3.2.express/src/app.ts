import express from "express";
import { loggingMiddleware } from "./middlewares/logging.middleware";
import indexRouter from "./routes";
const app = express();
const PORT = 3000;

//parse body
app.use(express.json()); //json
app.use(express.urlencoded()); //x-www-urlencoded

app.use(loggingMiddleware);

app.use("/api", indexRouter);

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
