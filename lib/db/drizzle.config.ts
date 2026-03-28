import { defineConfig } from "drizzle-kit";

const localDatabaseUrl =
  "postgresql://postgres:postgres@localhost:5432/school_web_manager";
const databaseUrl = process.env.DATABASE_URL ?? localDatabaseUrl;

if (!process.env.DATABASE_URL && process.env.NODE_ENV === "production") {
  throw new Error("DATABASE_URL must be set in production.");
}

export default defineConfig({
  schema: "./src/schema/*.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl,
  },
});
