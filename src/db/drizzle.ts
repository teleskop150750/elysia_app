import { drizzle } from "drizzle-orm/bun-sql";
import * as schema from "./schema.ts";
import { relations } from "./relations";
import { sql as client } from "./bun.ts";

export const db = drizzle({
  schema,
  relations,
  client,
  casing: "snake_case",
});
