// Blueroom tables live in the same Railway MySQL database as the main Auticare DB.
// Reuse the same connection env vars — no separate DB needed.
const { createPool } = require("mysql2");

const railwayDb = createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 20,
  ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : undefined,
});

module.exports = railwayDb;
