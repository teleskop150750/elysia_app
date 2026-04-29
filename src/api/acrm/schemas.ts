import z from "zod";

export const BaseListSchema = z.array(
  z.strictObject({
    id: z.string(),
    label: z.string(),
  }),
);

export const BasePaginationSchema = z.strictObject({
  total: z.number().int().min(0),
  per_page: z.number().int().min(1).max(100),
  current_page: z.number().int().min(1),
  last_page: z.number().int().min(1),
  from: z.number().int().min(0),
  to: z.number().int().min(0),
});

export const WorkspaceSchema = z.strictObject({
  id: z.string(),
  name: z.string(),
  disabled: z.boolean(),
  parent_id: z.nullable(z.string()),
});

export const OperatorSchema = z.strictObject({
  id: z.string(),
  name: z.string(),
});

export const PipelineStatusSchema = z.strictObject({
  id: z.string(),
  label: z.string(),
  color: z.string(),
  disabled: z.boolean(),
  parent_id: z.nullable(z.string()),
});

export const RegionSchema = z.strictObject({
  id: z.string(),
  label: z.string(),
});

export const ClientSchema = z.strictObject({
  id: z.string(),
  name: z.nullable(z.string()),
  rating: z.nullable(z.number().min(1).max(10)),
  region_id: z.nullable(z.string()),
  region: z.nullable(RegionSchema),
  phones: z.array(
    z.strictObject({
      id: z.string(),
      label: z.string(),
    }),
  ),
});

export const BasePipelineSchema = z.strictObject({
  id: z.string(),
  active_pipeline_id: z.nullable(z.string()),

  is_spam: z.boolean(),
  is_captcha: z.boolean(),

  status_id: z.string(),
  operator_id: z.string(),
  operator: OperatorSchema,
  client: ClientSchema,

  tag_list: z.array(z.string()),

  sale_type: z.nullable(z.string()),
  trade_in: z.nullable(z.boolean()),
  disposal: z.nullable(z.boolean()),

  lead_type: z.nullable(z.string()),
  source_id: z.nullable(z.string()),

  call_at: z.nullable(z.string()),
  visit_at: z.nullable(z.string()),
  closed_at: z.nullable(z.string()),
  created_at: z.string(),
  updated_at: z.string(),
});

export function objKeys<T extends Record<string, any>>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}

export function objOmit<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[],
): Omit<T, K> {
  const keysSet = new Set(keys);
  const res: Partial<T> = {};
  for (const key of objKeys(obj)) {
    if (!keysSet.has(key as K)) res[key] = obj[key];
  }
  return res as Omit<T, K>;
}
