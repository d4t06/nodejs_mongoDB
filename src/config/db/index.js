const mysql = require("mysql2");

const pool = mysql.createPool({
  connectionLimit: "10",
  // host: "localhost",
  user: "root",
  // password: "",
  database: "mydb",

  host: process.env.DB_HOST,
  // user: process.env.DB_USER,
  password: "",
  // database: process.env.DB_NAME,
});

module.exports = pool;
