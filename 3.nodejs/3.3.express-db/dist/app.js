"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const home_controller_1 = require("./controllers/home.controller");
const app = (0, express_1.default)();
const PORT = 3000;
app.get("/", home_controller_1.homeController.index);
app.listen(PORT, () => {
    console.log(`Đang chạy với port ${PORT}`);
});
//# sourceMappingURL=app.js.map