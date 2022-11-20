import { Client } from "pg";

// Config is read from .env file
const client = new Client();

export { client };
