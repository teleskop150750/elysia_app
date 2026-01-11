import { Elysia } from 'elysia'
import { MarksFilterSchema } from './schema.ts'
// import { getConfigurationsWithRelationsNested } from "./queries.ts";
import * as qb from 'drizzle-orm'
import {
  AutoConfigurationsTable,
  AutoMarksTable,
  AutoModelsTable,
  AutoGenerationsTable,
  AutoCountriesTable,
} from '#root/db/schema.ts'
import { db } from '#root/db/drizzle.ts'
export const auto = new Elysia().all(
  '/demo',
  ({ body }) => {
    return (
      db
        // agregate array of models for each mark
        .select({
          ...qb.getTableColumns(AutoMarksTable),
          country: AutoCountriesTable,
        })
        .from(AutoMarksTable)
        .leftJoin(
          AutoCountriesTable,
          qb.eq(AutoCountriesTable.id, AutoMarksTable.country_id),
        )
        // .leftJoin(
        //   AutoModelsTable,
        //   qb.eq(AutoModelsTable.mark_id, AutoMarksTable.id)
        // )
        // .groupBy(AutoMarksTable.id)
        .limit(10)
    )
    // return getConfigurationsWithRelationsNested(body, 50);
  },
  {
    // body: MarksFilterSchema,
  },
)
