import { z } from 'zod'
import { StringOperatorsSchema } from '#root/filter/schema.js'
import type { IFilterExpression } from '#root/filter/types.js'

export const MarksFilterBaseSchema = z.object({
  'auto.configurations.id': StringOperatorsSchema.optional(),
  'auto.configurations.name': StringOperatorsSchema.optional(),
})

export type IMarksFilterBase = z.infer<typeof MarksFilterBaseSchema>
export type IMarksFilter = IFilterExpression<IMarksFilterBase>

// Filters support recursive AND OR and NOT filters
export const MarksFilterSchema = z.object({
  FIELDS: MarksFilterBaseSchema,
  get AND() {
    return z.array(MarksFilterSchema).nullish()
  },
  get OR() {
    return z.array(MarksFilterSchema).nullish()
  },
  get NOT() {
    return MarksFilterSchema.nullish()
  },
})

export type InferMarksFilter = z.infer<typeof MarksFilterSchema>
