import { DB } from "./db"; // this is the Database interface we defined earlier
import { BunPostgresDialect } from "kysely-bun-sql";
import { Kysely, PostgresDialect } from "kysely";

const dialect = new BunPostgresDialect({
  url: process.env.DATABASE_URL,
  clientOptions: {
    max: 10,
  },
});

// Database interface is passed to Kysely's constructor, and from now on, Kysely
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
// to communicate with your database.
export const db = new Kysely<DB>({
  dialect,
});
