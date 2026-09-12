import { UserInput } from "../types/user.type";
import { pool } from "../utils/db";

export const userService = {
  async findAll(q: string = "") {
    const [rows] = await pool.query(`SELECT * FROM users WHERE name LIKE ?`, [
      `%${q}%`,
    ]);
    return rows;
  },
  async find(id: any) {
    const sql = "SELECT * FROM users WHERE id = ?";
    const [rows] = (await pool.query(sql, [id])) as any;
    // sql injection
    return rows[0];
  },
  async create({ name, email, status }: UserInput) {
    const [rows] = await pool.query(
      `
        INSERT INTO users(name, email, status)
        VALUES(?,?,?)
    `,
      [name, email, status],
    );
    const lastInsertId = (rows as { insertId: number }).insertId;
    return await this.find(lastInsertId);
  },
  async update({ name, email, status }: UserInput, id: number) {
    const fields = {} as any;
    const data = [];
    if (name) {
      fields.name = "?";
      data.push(name);
    }
    if (email) {
      fields.email = "?";
      data.push(email);
    }
    if (status) {
      fields.status = "?";
      data.push(status);
    }

    data.push(id);

    const attributes = Object.entries(fields)
      .map((item) => item.join("="))
      .join(",");
    const sql = `UPDATE users SET ${attributes} WHERE id=?`;

    const [rows] = await pool.query(sql, data);
    return rows;
  },
};

//prepare

//'3'; drop table products; --> text
