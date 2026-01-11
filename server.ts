import { Elysia } from 'elysia'

const app = new Elysia()

app.get('/', () => 'Hello, Elysia with Nitro!')

export default app.compile()

// import { Elysia } from "elysia";
// import { openapi } from "@elysiajs/openapi";
// import z from "zod";
// import { auto } from "./api/auto";

// const app = new Elysia()
//   .use(
//     openapi({
//       mapJsonSchema: {
//         zod: z.toJSONSchema,
//       },
//     })
//   )
//   .use(auto)
//   .get("/", () => "Hello Elysia")
//   .listen(3000);

// console.log(
//   `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
// );

// export default app.compile();
