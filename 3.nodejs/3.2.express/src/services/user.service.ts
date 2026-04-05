import fs from "fs/promises";
import path from "path";
import { NotFoundException } from "../exceptions/notfound.exception";
import { HttpException } from "../exceptions/http.exception";
export const userService = {
  async readUsers() {
    const userPath = path.resolve("src", "data", "user.json");
    const users = await fs.readFile(userPath, "utf-8");
    return JSON.parse(users);
  },
  async findAll() {
    return this.readUsers();
  },
  async find(id: number) {
    const users = await this.readUsers();
    const user = users.find((user: { id: number }) => user.id === id);
    throw new HttpException("Validate failed", 400, {
      name: "Name is required",
      email: "Email is not valid",
    });
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  },
};
