import * as v from "valibot";
import z from "zod";

export * as v from "valibot";

export const BaseListSchemaZod = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
  }),
);

export const BaseListSchemaVali = v.array(
  v.object({
    id: v.string(),
    name: v.string(),
  }),
);
