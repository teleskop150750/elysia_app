import { Elysia } from "elysia";
import { db } from "~/db/drizzle.ts";

export const filter = new Elysia()
  .all("/filter/options/marks", () => {
    return db.query.AutoMarksTable.findMany({
      extras: {
        value: (table, { sql }) => sql`${table.id}`,
        label: (table, { sql }) => sql`${table.name}`,
      },
      columns: {},
      limit: 20,
    });
  })
  .all("/filter/options/models", () => {
    return db.query.AutoModelsTable.findMany({
      extras: {
        value: (table, { sql }) => sql`${table.id}`,
        label: (table, { sql }) => sql`${table.name}`,
      },
      columns: {},
      limit: 20,
    });
  });
