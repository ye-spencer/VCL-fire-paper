import type { Config } from "drizzle-kit";

export default {
  dialect: "sqlite",
  schema: "./drizzle/schema.ts",
  out: "./drizzleOutput",
  dbCredentials: {
    url: "./sqlite.db",
  },
} satisfies Config;
