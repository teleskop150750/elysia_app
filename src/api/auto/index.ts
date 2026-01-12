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
  .all("/drizzle/qb", () => {
    return db
      .select({
        ...getColumns(AutoMarksTable),
        country: AutoCountriesTable,
      })
      .from(AutoMarksTable)
      .leftJoin(
        AutoCountriesTable,
        qb.eq(AutoCountriesTable.id, AutoMarksTable.country_id),
      )
      .limit(10);
  })
  .all("/drizzle/query/marks", () => {
    const filter = {
      models: {
        generations: {
          id: {
            in: ["01988396-ec68-74ac-a900-c355f195ec37"],
          },
        },
      },
    };
    return db.query.AutoMarksTable.findMany({
      with: {
        models: {
          where: filter.models,
          with: {
            generations: {
              where: filter.models.generations,
            },
          },
        },
      },
      where: {
        country: {
          id: {
            in: ["0198842f-cdfc-722f-820a-7228f8c2482e"],
          },
        },
        ...filter,
      },
      limit: 5,
    });
  })
  .all("/drizzle/query/complectations", () => {
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
            },
            promos: true,
          },
        },
        tech_param: true,
        equipment: true,
      },
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
                    in: ["0198842f-cdfc-722f-820a-7228f8c2482e"],
                  },
                },
              },
            },
          },
        },
      },
      limit: 5,
    });
  });
