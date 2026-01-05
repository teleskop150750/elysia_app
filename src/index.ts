import { Elysia } from "elysia";
import { auto } from "./api/auto/index.ts";
import { openapi } from "@elysiajs/openapi";
import z from "zod";

const app = new Elysia()
  .use(
    openapi({
      mapJsonSchema: {
        zod: z.toJSONSchema,
      },
    })
  )
  .use(auto)
  .get("/", () => "Hello Elysia")
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
