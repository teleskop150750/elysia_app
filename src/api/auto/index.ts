import { Elysia } from "elysia";
import { db } from "#root/db/index.ts";
import { MarksFilterSchema } from "./schema.ts";
import { filterToWhere } from "#root/filter/builder.ts";

export const auto = new Elysia().all(
  "/demo",
  ({ body }) => {
    console.error("body", body);
    return db
      .selectFrom("auto.marks")
      .selectAll()
      .where((eb) => filterToWhere(eb, body))
      .execute();
  },
  {
    body: MarksFilterSchema,
  }
);
