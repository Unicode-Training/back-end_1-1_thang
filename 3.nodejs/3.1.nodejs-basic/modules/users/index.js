const path = require("path");
// console.log(path.resolve("data", "data.txt"));
const fs = require("fs/promises");

const readFile = async () => {
  const data = await fs.readFile(path.resolve("data", "data.txt"), "utf-8");
  console.log(data);
};
readFile();
