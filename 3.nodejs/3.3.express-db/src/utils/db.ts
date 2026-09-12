import mysql from "mysql2/promise";

export const pool = mysql.createPool({
  host: process.env.DB_HOST as string,
  user: process.env.DB_USER as string,
  database: process.env.DB_DATABASE as string,
  port: process.env.DB_PORT as unknown as number,
  password: process.env.DB_PASSWORD as string,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  debug: true,
  multipleStatements: false, //true: Cho phép chạy nhiều câu lệnh sql
});
