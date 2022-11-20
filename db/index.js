const { readFileSync } = require("fs");
const { join } = require("path");
const { Client } = require("pg");

require("dotenv").config();

// Read SQL seed query
const seedQuery = readFileSync(join(__dirname, "scripts/seed.sql"), {
  encoding: "utf-8",
});

// Config is read from .env file
const client = new Client();

console.log("Connecting to db...");
client
  .connect()
  .then(() => {
    console.log("Running SQL seed...");
    client.query(seedQuery, ["john@doe.com", "johndoe"], (err) => {
      if (err) throw err;
      console.log("Seed completed successfully!");
      client.end();
    });
  })
  .catch((err) => {
    throw err;
  });
