import { getColumns } from "drizzle-orm";
import { Elysia } from "elysia";
import { db, qb } from "~/db/drizzle.ts";
import { AutoCountriesTable, AutoMarksTable } from "~/db/schema.ts";
import { getConfigurationsWithRelationsNested } from "./queries.ts";
import { MarksFilterSchema } from "./schema.ts";

export const auto = new Elysia()
  .all(
    "/kysely",
    ({ body }) => {
      return getConfigurationsWithRelationsNested(body, 50);
    },
    {
      body: MarksFilterSchema,
    },
  )
  .all(
    "/drizzle/qb",
    () => {
      return (
        db
          // agregate array of models for each mark
          .select({
            ...getColumns(AutoMarksTable),
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
      );
      // return getConfigurationsWithRelationsNested(body, 50);
    },
    {
      // body: MarksFilterSchema,
    },
  )
  .all("/drizzle/query", () => {
    return db.query.AutoComplectationsTable.findMany({
      with: {
        configuration: {
          with: {
            generation: {
              with: {
                model: {
                  with: {
                    mark: {
                      with: {
                        country: true,
                      },
                    },
                  },
                },
              },
              where: {
                id: {
                  eq: "0198838c-51ab-775f-b537-104bbd0b1192",
                },
              },
            },
            promos: true,
          },
          // where: {
          //   NOT: {
          //     auto_class: {
          //       eq: 'E'
          //     }
          //   }
          // },
        },
        tech_param: true,
        equipment: true,

        // mark: {
        //   with: {
        //     country: true,
        //   },
        // },
        // generations: {
        //   limit: 10,
        // },
      },
      // where: {
      //   id: {
      //     eq: "019883eb-da5b-727a-b34b-668a9bcdc6d9",
      //   },
      // },
      limit: 5,
    });
  });
