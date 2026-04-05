//Module: commonJS
// import { a, b } from "./a.js";
// import monent from "moment";
// console.log(a, b);
// console.log(monent().format("YYYY-MM-DD HH:mm:ss"));

//Module có sẵn

//1. file system: Xử lý file
// const fs = require("fs/promises");

//Read file
// const readFile = async () => {
//   try {
//     const dataPromise = await fs.readFile("./data/data.txt", "utf-8");
//     console.log(dataPromise);
//   } catch (err) {
//     console.log(err);
//   }
// };
// readFile();

//Write
// const writeFilePromise = async () => {
//   await fs.writeFile("./data/data.txt", "Unicode\n", {
//     // flag: "a+",
//   });
// };
// writeFilePromise();

//Delete file
// const deleteFile = async () => {
//   await fs.unlink("./data/data.txt");
// };
// deleteFile();

//Kiểm tra file, folder tồn tại
// const checkFile = async () => {
//   try {
//     await fs.access("./data");
//     console.log("Tồn tại");
//   } catch {
//     console.log("Không tồn tại");
//   }
// };
// checkFile();

//scan folder
// const scanFolder = async () => {
//   const listing = await fs.readdir("./data");
//   console.log(listing);
// };
// scanFolder();

//create folder
// const createFolder = async () => {
//   await fs.mkdir("./data/sub-folder");
// };
// createFolder();

//2. url: Bóc tách các thành phần của 1 url để xử lý
// const url = require("url");
// const myUrl = `https://unicode.vn:8888/khoa-hoc/nodejs?ref=abc#ahihi`;
// const urlParsed = url.parse(myUrl, true);
// console.log(urlParsed);
// const pathname = urlParsed.pathname;
// console.log(pathname);

//3. path
// console.log(__dirname);
// console.log(__filename);

// require("./modules/users/index");
// const path = require("path");
//join: Nối các đường dẫn con thành đường dẫn đầy đủ
// const myPath = path.join(__dirname, "..", "..", "modules", "users", "index.js");
// console.log(myPath);
// globalThis._DIRNAME = __dirname;
// require("./modules/users/index");

// const fileUpload = "/uploads/images/anh1.jpg";
// console.log(path.basename(fileUpload));
// console.log(path.extname(fileUpload));

// console.log(path.join("data", "data.txt"));

// console.log(path.resolve("data", "data.txt"));

// require("dotenv/config");
// console.log(process.env.APP_NAME);
