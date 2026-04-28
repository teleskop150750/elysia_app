import { openapi } from "@elysiajs/openapi";
import { Elysia } from "elysia";
import { z } from "zod";
import { cars } from "./api/acrm/cars";
import { offers } from "./api/acrm/offers";
import { pipelines } from "./api/acrm/pipelines";
import { session } from "./api/acrm/session";
import { workspaces } from "./api/acrm/workspaces";
// import { auto } from "./api/auto/index.ts";
// import { filter } from "./api/filters/index.ts";

const app = new Elysia()
  .use(
    openapi({
      scalar: {
        theme: "elysiajs",
        hiddenClients: {
          c: true,
          csharp: true,
          clojure: true,
          dart: true,
          go: true,
          http: true,
          java: true,
          js: true,
          // js: ["fetch", "ofetch"],
          kotlin: true,
          // node: true,
          objc: true,
          ocaml: true,
          // php: true,
          powershell: true,
          python: true,
          r: true,
          ruby: true,
          rust: true,
          fsharp: true,
          // shell: true,
          swift: true,
        },
        defaultHttpClient: {
          targetKey: "node",
          clientKey: "ofetch",
        },
        darkMode: true,
      },
      exclude: {
        paths: ["/"],
      },
      mapJsonSchema: {
        zod: z.toJSONSchema,
      },
    }),
    // openapi({
    //   references: fromTypes(),
    // }),
  )
  .use(session)
  .use(workspaces)
  .use(pipelines)
  .use(offers)
  .use(cars)
  // .use(filter)
  .get("/", () => "<a href='/openapi'>OpenAPI Spec</a>");

// eslint-disable-next-line no-console
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

export default app.compile();
