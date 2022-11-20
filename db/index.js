const { readFileSync } = require("fs");
const { join } = require("path");
const { Client } = require("pg");

require("dotenv").config();

// Read SQL seed query
const seedQuery = readFileSync(join(__dirname, "scripts/create-tables.sql"), {
  encoding: "utf-8",
});

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "mypassword",
  port: 5432,
});

client.connect();

console.log("Running SQL seed...");
client.query(seedQuery, (err) => {
  if (err) throw err;
  console.log("SQL seed completed successfully!");
  client.end();
});
