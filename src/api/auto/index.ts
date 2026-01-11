import { Elysia } from "elysia";
import { MarksFilterSchema } from "./schema.ts";
import { getConfigurationsWithRelationsNested } from "./queries.ts";

export const auto = new Elysia().all(
  "/demo",
  ({ body }) => {
    return getConfigurationsWithRelationsNested(body, 50);
  },
  {
    body: MarksFilterSchema,
  }
);
