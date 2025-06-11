const mysql = require('mysql2/promise');
require('dotenv').config()

console.log(process.env.MINDSDB_USER)
const connection = mysql.createPool({
  host: process.env.MINDSDB_HOST,
  port: process.env.MINDSDB_PORT || 3306,
  user: process.env.MINDSDB_USER,
  password: process.env.MINDSDB_PASSWORD,
  database: 'mindsdb',
  database: 'mindsdb',
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
  connectTimeout: 10000 // 10 seconds

});

module.exports = connection;
