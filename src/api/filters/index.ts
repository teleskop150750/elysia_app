import { Elysia } from "elysia";
import { db } from "~/db/drizzle.ts";

async function getMarks() {
  return db.query.AutoMarksTable.findMany({
    extras: {
      value: (table, { sql }) => sql`${table.id}`,
      label: (table, { sql }) => sql`${table.name}`,
    },
    columns: {},
    limit: 20,
  });
}
async function getModels() {
  return db.query.AutoModelsTable.findMany({
    extras: {
      value: (table, { sql }) => sql`${table.id}`,
      label: (table, { sql }) => sql`${table.name}`,
    },
    columns: {},
    limit: 20,
  });
}

export const filter = new Elysia()
  .all("/filter/options/base", () => {
    const tableName = "marks";
    return tableName === "marks" ? getMarks() : getModels();
  })
  .all("/filter/options/marks", () => {
    return getMarks();
  })
  .all("/filter/options/models", () => {
    return getModels();
  });
