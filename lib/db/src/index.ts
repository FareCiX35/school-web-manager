import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

const { Pool } = pg;
const localDatabaseUrl =
  "postgresql://postgres:postgres@localhost:5432/school_web_manager";
const databaseUrl = process.env.DATABASE_URL ?? localDatabaseUrl;

if (!process.env.DATABASE_URL && process.env.NODE_ENV === "production") {
  throw new Error("DATABASE_URL must be set in production.");
}

export const pool = new Pool({ connectionString: databaseUrl });
export const db = drizzle(pool, { schema });

export * from "./schema";
