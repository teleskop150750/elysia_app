import { openapi } from "@elysiajs/openapi";
import { toJsonSchema } from "@valibot/to-json-schema";
import { Elysia } from "elysia";
import { z } from "zod";
import { session } from "./api/acrm/session";
import { workspaces } from "./api/acrm/workspaces";
// import { auto } from "./api/auto/index.ts";
// import { filter } from "./api/filters/index.ts";

const app = new Elysia()
  .use(
    openapi({
      mapJsonSchema: {
        zod: z.toJSONSchema,
        valibot: toJsonSchema,
      },
    }),
    // openapi({
    //   references: fromTypes(),
    // }),
  )
  .use(session)
  .use(workspaces)
  // .use(filter)
  .get("/", () => "<a href='/openapi'>OpenAPI Spec</a>");

// eslint-disable-next-line no-console
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

export default app.compile();
