import { Elysia } from "elysia";
import { db } from "./db";

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .all("/demo", () => {
    return db.selectFrom("auto.marks").selectAll().execute();
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
