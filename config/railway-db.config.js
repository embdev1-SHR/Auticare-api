const { createPool } = require("mysql2");

const railwayDb = createPool({
  host: process.env.RAILWAY_DB_HOST,
  port: process.env.RAILWAY_DB_PORT || 3306,
  user: process.env.RAILWAY_DB_USER,
  password: process.env.RAILWAY_DB_PASSWORD,
  database: process.env.RAILWAY_DB_NAME,
  connectionLimit: 20,
  ssl: process.env.RAILWAY_DB_SSL === "true" ? { rejectUnauthorized: false } : undefined,
});

module.exports = railwayDb;
