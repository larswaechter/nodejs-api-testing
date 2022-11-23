import { Pool } from 'pg';

// Config is read from .env file
const pool = new Pool();

export { pool };
