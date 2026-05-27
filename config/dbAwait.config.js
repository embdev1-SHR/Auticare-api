const { createPool } = require(`mysql-await`);

const dbConfig = {
  port: 3306,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  connectionLimit: 50,
};
/** Connection pool creation - START */
const dbAwait = createPool(dbConfig);
/** Connection pool creation - END */

module.exports = dbAwait;
