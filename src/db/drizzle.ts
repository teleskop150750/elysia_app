import { drizzle } from "drizzle-orm/bun-sql";
import { sql as client } from "./bun.ts";
import { relations } from "./relations";
import * as schema from "./schema.ts";

export * as qb from "drizzle-orm";

export const db = drizzle({
  schema,
  relations,
  client,
  casing: "snake_case",
  logger: true,
});
