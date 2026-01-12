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
      // with: {
      //   configuration: {
      //     with: {
      //       generation: {
      //         with: {
      //           model: {
      //             with: {
      //               mark: {
      //                 with: {
      //                   country: true,
      //                 },
      //               },
      //             },
      //           },
      //         },
      //       },
      //       promos: true,
      //     },
      //   },
      //   tech_param: true,
      //   equipment: true,
      // },
      where: {
        configuration: {
          auto_class: {
            eq: "D",
          },
          generation: {
            model: {
              mark: {
                country: {
                  id: {
                    eq: '0198842f-cdfc-722f-820a-7228f8c2482e'
                  }
                }
              }
            }
          }

        },
      },
      limit: 5,
    });
  });
