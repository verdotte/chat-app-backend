import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const {
  DB_USER,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DEV_DB,
  TEST_DB,
  NODE_ENV,
} = process.env;

const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: NODE_ENV === 'development' ? DEV_DB : TEST_DB,
  password: DB_PASSWORD,
  port: DB_PORT,
});

export default pool;
