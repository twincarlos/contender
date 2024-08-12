import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/app/drizzle/schema.js",
  out: "./src/app/drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DATABASE_URL,
  },
});