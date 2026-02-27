import type { Config } from "drizzle-kit";

export default {
  schema: "./src/server/db/schema/*",
  out: "./src/server/db/migrations",
  dialect: "sqlite",
  driver: "d1-http",
  dbCredentials: {
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID || "",
    databaseId: "e2422202-940b-4519-9374-d5b755f563cf", // Database thực tế của Vân Trang Edu
    token: process.env.CLOUDFLARE_D1_TOKEN || "",
  },
} satisfies Config;
