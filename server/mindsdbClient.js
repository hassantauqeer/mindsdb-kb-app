// server/mindsdbClient.js
require('dotenv').config();
const MindsDB = require("mindsdb-js-sdk").default;

let connected = false;

const connectToMindsDB = async () => {
  if (connected) return;

  console.log('process.env.MINDSDB_USER = ', process.env.MINDSDB_USER)
  await MindsDB.connect({
    user: process.env.MINDSDB_USER,
    password: process.env.MINDSDB_PASSWORD,
    host: process.env.MINDSDB_HOST,
  });

  connected = true;
};

module.exports = {
  MindsDB,
  connectToMindsDB
};
