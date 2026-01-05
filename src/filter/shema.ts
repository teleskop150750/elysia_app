import { z, ZodArray, ZodType } from "zod";

export const defineArrayFieldSchema = <T extends ZodArray<ZodType>>(type: T) =>
  z.object({
    eq: type.optional(),
    arrayContains: type.optional(),
    arrayContained: type.optional(),
    arrayOverlaps: type.optional(),
    isEmpty: z.boolean().optional(),
    isNotEmpty: z.boolean().optional(),
  });

export const BooleanFieldSchema = z.object({
  eq: z.boolean().optional(),
  ne: z.boolean().optional(),
});

export const StringFieldSchema = z.object({
  eq: z.string().optional(),
  ne: z.string().optional(),
  inArray: z.array(z.string()).optional(),
  notInArray: z.array(z.string()).optional(),
  like: z.string().optional(),
  ilike: z.string().optional(),
  notLike: z.string().optional(),
  notIlike: z.string().optional(),
});

export const NumberFieldSchema = z.object({
  eq: z.number().optional(),
  ne: z.number().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  inArray: z.array(z.number()).optional(),
  notInArray: z.array(z.number()).optional(),
  between: z
    .object({
      min: z.number(),
      max: z.number(),
    })
    .optional(),
  notBetween: z
    .object({
      min: z.number(),
      max: z.number(),
    })
    .optional(),
});

export const DateFieldSchema = z.object({
  eq: z.date().optional(),
  ne: z.date().optional(),
  lt: z.date().optional(),
  lte: z.date().optional(),
  gt: z.date().optional(),
  gte: z.date().optional(),
  inArray: z.array(z.date()).optional(),
  notInArray: z.array(z.date()).optional(),
  between: z
    .object({
      min: z.date(),
      max: z.date(),
    })
    .optional(),
  notBetween: z
    .object({
      min: z.date(),
      max: z.date(),
    })
    .optional(),
});

export const NullableFieldSchema = z.object({
  isNull: z.boolean().optional(),
  isNotNull: z.boolean().optional(),
});

const defineScalarFieldSchema = <T extends ZodType>(type: T) =>
  z.object({
    eq: type.optional(),
    ne: type.optional(),
    lt: type.optional(),
    lte: type.optional(),
    gt: type.optional(),
    gte: type.optional(),
    inArray: z.array(type).optional(),
    notInArray: z.array(type).optional(),
    isNull: z.boolean().optional(),
    isNotNull: z.boolean().optional(),
    between: z
      .object({
        min: type,
        max: type,
      })
      .optional(),
    notBetween: z
      .object({
        min: type,
        max: type,
      })
      .optional(),
    like: z.string().optional(),
    ilike: z.string().optional(),
    notLike: z.string().optional(),
    notIlike: z.string().optional(),
  });

/**
 * Schema for Generic filter operations
 *
 * Due to TS limitations DON'T USE THIS TO TYPE YOUR FILTERS, it is only for validation
 *
 */
export const genericOperationSchema = defineArrayFieldSchema(z.array(z.any()))
  .extend(defineScalarFieldSchema(z.any()).shape)
  .strict();
