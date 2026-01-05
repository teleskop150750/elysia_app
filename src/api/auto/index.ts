import Elysia from "elysia";
import { db } from "#root/db";

export const auto = new Elysia().all("/demo", () => {
  return db.selectFrom("auto.marks").selectAll().execute();
});
