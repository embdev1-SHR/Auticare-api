const { createPool } = require("mysql2");
/** Connection pool creation - START */
const db = createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  connectionLimit: 100,
  // waitForConnections: true,
  // maxIdle: 10,
  // idleTimeout: 60000,
  // queueLimit: 0,
  ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : undefined,
});
/** Connection pool creation - END */

module.exports = db;
