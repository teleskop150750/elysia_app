import { openapi } from "@elysiajs/openapi";
import { Elysia } from "elysia";
import z from "zod";
import { auto } from "./api/auto/index.ts";

const app = new Elysia()
  .use(
    openapi({
      mapJsonSchema: {
        zod: z.toJSONSchema,
      },
    }),
  )
  .use(auto)
  .get("/", () => "Hello Elysia");

// eslint-disable-next-line no-console
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

export default app.compile();
