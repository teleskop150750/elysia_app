import { Elysia } from "elysia";
import { auto } from "./api/auto";

const app = new Elysia()
  .use(auto)
  .get("/", () => "Hello Elysia")
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
