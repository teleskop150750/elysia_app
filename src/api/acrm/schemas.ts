import z from "zod";

export const BasePaginationSchema = z.strictObject({
  total: z.number().int().min(0),
  per_page: z.number().int().min(1).max(100),
  current_page: z.number().int().min(1),
  last_page: z.number().int().min(1),
  from: z.number().int().min(0),
  to: z.number().int().min(0),
});
export const BasePaginationMock: z.infer<typeof BasePaginationSchema> = {
  total: 50,
  per_page: 15,
  current_page: 1,
  last_page: 4,
  from: 1,
  to: 15,
};

export const WorkspaceSchema = z.strictObject({
  id: z.string(),
  name: z.string(),
  disabled: z.boolean(),
  parent_id: z.nullable(z.string()),
});
export const WorkspaceMock: z.infer<typeof WorkspaceSchema> = {
  id: "1",
  name: "Workspace 1",
  disabled: false,
  parent_id: null,
};

export const OperatorSchema = z.strictObject({
  id: z.string(),
  name: z.string(),
});
export const OperatorMock: z.infer<typeof OperatorSchema> = {
  id: "789",
  name: "Alice Smith",
};
export const HandsetSchema = z.strictObject({
  id: z.string(),
  owner: z.nullish(OperatorSchema),
});
export const HandsetMock: z.infer<typeof HandsetSchema> = {
  id: "handset1",
  owner: OperatorMock,
};

export const PipelineStatusSchema = z.strictObject({
  id: z.string(),
  label: z.string(),
  color: z.string(),
  disabled: z.boolean(),
  parent_id: z.nullable(z.string()),
});
export const PipelineStatusMock: z.infer<typeof PipelineStatusSchema> = {
  id: "123",
  label: "New",
  color: "#00ff00",
  disabled: false,
  parent_id: null,
};

export const RegionSchema = z.strictObject({
  id: z.string(),
  name: z.string(),
});
export const RegionMock: z.infer<typeof RegionSchema> = {
  id: "987",
  name: "Moscow",
};
export const SourceSchema = z.strictObject({
  id: z.string(),
  name: z.string(),
});
export const SourceMock: z.infer<typeof SourceSchema> = {
  id: "456",
  name: "Facebook Ads",
};
export const CustomerPhoneSchema = z.strictObject({
  id: z.string(),
  label: z.string(),
});
export const CustomerPhoneMock: z.infer<typeof CustomerPhoneSchema> = {
  id: "555-1234",
  label: "+1 (555) 123-4567",
};
export const CustomerSchema = z.strictObject({
  id: z.string(),
  name: z.nullable(z.string()),
  rating: z.nullable(z.number().min(1).max(10)),
  region_id: z.nullable(z.string()),
  region: z.nullable(RegionSchema),
  phones: z.array(CustomerPhoneSchema),
});
export const CustomerMock: z.infer<typeof CustomerSchema> = {
  id: "321",
  name: "Jane Doe",
  rating: 8,
  region_id: RegionMock.id,
  region: RegionMock,
  phones: [CustomerPhoneMock],
};

export const OfferSchema = z.strictObject({
  id: z.string(),
  name: z.string(),
});
export const OfferMock: z.infer<typeof OfferSchema> = {
  id: "777",
  name: "Special Offer",
};
export const VehicleSchema = z.strictObject({
  id: z.string(),
  make: z.string(),
  model: z.string(),
  year: z.number().int().min(1900).max(new Date().getFullYear()),
});
export const VehicleMock: z.infer<typeof VehicleSchema> = {
  id: "888",
  make: "Toyota",
  model: "Camry",
  year: 2020,
};
export const PipelineTagSchema = z.strictObject({
  id: z.string(),
  label: z.string(),
});
export const PipelineTagMock: z.infer<typeof PipelineTagSchema> = {
  id: "tag1",
  label: "Tag 1",
};

export const PipelineSchema = z.strictObject({
  id: z.string(),
  active_pipeline_id: z.nullable(z.string()),

  is_spam: z.boolean(),
  is_captcha: z.boolean(),

  status_id: z.string(),
  status: PipelineStatusSchema,

  operator_id: z.string(),
  operator: OperatorSchema,

  customer_id: z.string(),
  customer: CustomerSchema,

  tag_list: z.array(PipelineTagSchema),

  sale_type: z.nullable(z.string()),
  trade_in: z.nullable(z.boolean()),
  disposal: z.nullable(z.boolean()),

  lead_type: z.nullable(z.string()),

  source_id: z.nullable(z.string()),
  source: z.nullable(SourceSchema),

  ad_url: z.url().nullable(),
  ad_external_id: z.nullable(z.string()),

  target_vehicle_id: z.nullable(z.string()),
  target_vehicle: z.nullable(OfferSchema),

  desired_vehicle_id: z.nullable(z.string()),
  desired_vehicle: z.nullable(VehicleSchema),

  sold_vehicle_id: z.nullable(z.string()),
  sold_vehicle: z.nullable(VehicleSchema),

  advertised_price: z.nullable(z.number().min(0)),
  desired_price: z.nullable(z.number().min(0)),
  catalog_price_at_sale: z.nullable(z.number().min(0)),
  selling_price: z.nullable(z.number().min(0)),

  call_at: z.nullable(z.string()),
  visit_at: z.nullable(z.string()),
  closed_at: z.nullable(z.string()),
  deleted_at: z.nullable(z.string()),
  created_at: z.string(),
  updated_at: z.string(),
});
export const BasePipelineMock: z.infer<typeof PipelineSchema> = {
  id: "555",
  active_pipeline_id: null,

  is_spam: false,
  is_captcha: false,

  status_id: PipelineStatusMock.id,
  status: PipelineStatusMock,

  operator_id: OperatorMock.id,
  operator: OperatorMock,

  customer_id: CustomerMock.id,
  customer: CustomerMock,

  tag_list: [PipelineTagMock],

  sale_type: "new",
  trade_in: false,
  disposal: false,

  lead_type: "organic",

  ad_url: "https://example.com/offer/555",
  ad_external_id: "555",

  source_id: SourceMock.id,
  source: SourceMock,

  target_vehicle_id: OfferMock.id,
  target_vehicle: OfferMock,

  desired_vehicle_id: VehicleMock.id,
  desired_vehicle: VehicleMock,

  sold_vehicle_id: VehicleMock.id,
  sold_vehicle: VehicleMock,

  advertised_price: 30000,
  desired_price: 25000,
  catalog_price_at_sale: 26000,
  selling_price: 24000,

  call_at: null,
  visit_at: null,
  closed_at: null,
  deleted_at: null,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

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
