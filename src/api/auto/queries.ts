import { dbKysely } from '~/db/index.ts'
import { filterToWhere } from '~/filter/builder.ts'
import type { IFilterExpression } from '~/filter/types.ts'
import { objEntries } from '~/utils/index.ts'

function narrowFilterToTablePrefix(
  filter: IFilterExpression | undefined | null,
  tablePrefix: string,
): IFilterExpression | undefined {
  if (!filter) return undefined

  const pickFieldsWithTablePrefix = (
    fields: IFilterExpression['FIELDS'],
    tablePrefix: string,
  ): IFilterExpression['FIELDS'] => {
    if (!fields) return fields

    const pickedFields: IFilterExpression['FIELDS'] = {}
    for (const [field, value] of objEntries(fields)) {
      if (field.startsWith(`${tablePrefix}.`)) {
        pickedFields[field] = value
      }
    }

    return Object.keys(pickedFields).length === 0 ? undefined : pickedFields
  }

  const mapAndDropEmptySubexpressions = (
    expressions: IFilterExpression['AND'],
    tablePrefix: string,
  ) => {
    if (!expressions) return undefined

    const narrowed = expressions
      .map((expr) => narrowFilterToTablePrefix(expr, tablePrefix))
      .filter((expr) => expr != null)

    return narrowed.length === 0 ? undefined : narrowed
  }

  return {
    FIELDS: pickFieldsWithTablePrefix(filter.FIELDS, tablePrefix),
    AND: mapAndDropEmptySubexpressions(filter.AND, tablePrefix),
    OR: mapAndDropEmptySubexpressions(filter.OR, tablePrefix),
    NOT: narrowFilterToTablePrefix(filter.NOT, tablePrefix),
  }
}

export function selectConfigurations(filter?: IFilterExpression, limit = 100) {
  const tableScopedFilter = narrowFilterToTablePrefix(
    filter,
    'auto.configurations',
  )

  return dbKysely
    .selectFrom('auto.configurations')
    .select([
      'auto.configurations.id',
      'auto.configurations.autoru_id',
      'auto.configurations.human_name',
      'auto.configurations.slug',
      'auto.configurations.generation_id',
    ])
    .where((eb) => filterToWhere(eb, tableScopedFilter))
    .limit(limit)
}

export async function getComplectationsByConfigurationIds(
  configurationIds: string[],
) {
  if (configurationIds.length === 0) return []

  return await dbKysely
    .selectFrom('auto.complectations')
    .select([
      'auto.complectations.id',
      'auto.complectations.configuration_id',
      'auto.complectations.slug',
    ])
    .where('auto.complectations.configuration_id', 'in', configurationIds)
    .execute()
}

export async function getGenerationsByIds(generationIds: string[]) {
  if (generationIds.length === 0) return []

  return await dbKysely
    .selectFrom('auto.generations')
    .select([
      'auto.generations.id',
      'auto.generations.autoru_id',
      'auto.generations.name',
      'auto.generations.slug',
      'auto.generations.year_from',
      'auto.generations.year_to',
      'auto.generations.model_id',
    ])
    .where('auto.generations.id', 'in', generationIds)
    .execute()
}

export async function getModelsByIds(modelIds: string[]) {
  if (modelIds.length === 0) return []

  return await dbKysely
    .selectFrom('auto.models')
    .select([
      'auto.models.id',
      'auto.models.name',
      'auto.models.slug',
      'auto.models.autoru_slug',
      'auto.models.mark_id',
    ])
    .where('auto.models.id', 'in', modelIds)
    .execute()
}

export async function getMarksByIds(markIds: string[]) {
  if (markIds.length === 0) return []

  return await dbKysely
    .selectFrom('auto.marks')
    .select([
      'auto.marks.id',
      'auto.marks.autoru_id',
      'auto.marks.name',
      'auto.marks.slug',
      'auto.marks.autoru_slug',
      'auto.marks.cyrillic_name',
      'auto.marks.country_id',
    ])
    .where('auto.marks.id', 'in', markIds)
    .execute()
}

export async function getCountriesByIds(countryIds: string[]) {
  if (countryIds.length === 0) return []

  return await dbKysely
    .selectFrom('auto.countries')
    .select(['auto.countries.id', 'auto.countries.name'])
    .where('auto.countries.id', 'in', countryIds)
    .execute()
}

export type NestedCountry = { id: string; name: string }
export type NestedMark = {
  id: string
  autoru_id: unknown
  name: string
  slug: string
  autoru_slug: string
  cyrillic_name: string
  country: NestedCountry | null
}

export type NestedModel = {
  id: string
  name: string
  slug: string
  autoru_slug: string
  mark: NestedMark | null
}

export type NestedGeneration = {
  id: string
  autoru_id: unknown
  name: string
  slug: string
  year_from: number
  year_to: number
  model: NestedModel | null
}

export type NestedComplectation = {
  id: string
  slug: string
}

export type NestedConfiguration = {
  id: string
  autoru_id: unknown
  human_name: string
  slug: string
  generation: NestedGeneration | null
  complectations: NestedComplectation[]
}

export async function getConfigurationsWithRelationsNested(
  filter?: IFilterExpression,
  limit = 100,
): Promise<NestedConfiguration[]> {
  const configurations = await selectConfigurations(filter, limit).compile()
    .parameters
  return configurations

  const configurationIds = configurations.map((c) => c.id)
  const generationIds = Array.from(
    new Set(configurations.map((c) => c.generation_id)),
  )

  const [generations, complectations] = await Promise.all([
    getGenerationsByIds(generationIds),
    getComplectationsByConfigurationIds(configurationIds),
  ])

  const modelIds = Array.from(new Set(generations.map((g) => g.model_id)))
  const models = await getModelsByIds(modelIds)

  const markIds = Array.from(new Set(models.map((m) => m.mark_id)))
  const marks = await getMarksByIds(markIds)

  const countryIds = Array.from(
    new Set(marks.map((m) => m.country_id).filter((v): v is string => !!v)),
  )
  const countries = await getCountriesByIds(countryIds)

  const countryById = new Map(countries.map((c) => [c.id, c] as const))
  const markById = new Map(
    marks.map(
      (m) =>
        [
          m.id,
          {
            id: m.id,
            autoru_id: m.autoru_id,
            name: m.name,
            slug: m.slug,
            autoru_slug: m.autoru_slug,
            cyrillic_name: m.cyrillic_name,
            country: m.country_id
              ? (countryById.get(m.country_id) ?? null)
              : null,
          } satisfies NestedMark,
        ] as const,
    ),
  )

  const modelById = new Map(
    models.map(
      (m) =>
        [
          m.id,
          {
            id: m.id,
            name: m.name,
            slug: m.slug,
            autoru_slug: m.autoru_slug,
            mark: markById.get(m.mark_id) ?? null,
          } satisfies NestedModel,
        ] as const,
    ),
  )

  const generationById = new Map(
    generations.map(
      (g) =>
        [
          g.id,
          {
            id: g.id,
            autoru_id: g.autoru_id,
            name: g.name,
            slug: g.slug,
            year_from: g.year_from,
            year_to: g.year_to,
            model: modelById.get(g.model_id) ?? null,
          } satisfies NestedGeneration,
        ] as const,
    ),
  )

  const complectationsByConfigurationId = new Map<
    string,
    NestedComplectation[]
  >()
  for (const c of complectations) {
    const list = complectationsByConfigurationId.get(c.configuration_id) ?? []
    list.push({ id: c.id, slug: c.slug })
    complectationsByConfigurationId.set(c.configuration_id, list)
  }

  return configurations.map(
    (c) =>
      ({
        id: c.id,
        autoru_id: c.autoru_id,
        human_name: c.human_name,
        slug: c.slug,
        generation: generationById.get(c.generation_id) ?? null,
        complectations: complectationsByConfigurationId.get(c.id) ?? [],
      }) satisfies NestedConfiguration,
  )
}
