import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/app/drizzle/schema.js",
  out: "./src/app/drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});