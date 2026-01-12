import { getColumns, sql } from "drizzle-orm";
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
  .all("/drizzle/query/filter/options/marks", () => {
    return db.query.AutoMarksTable.findMany({
      extras: {
        value: (table, { sql }) => sql`${table.id}`,
        label: (table, { sql }) => sql`${table.name}`,
      },
      columns: {},
      limit: 20,
    });
  })
  .all("/drizzle/query/filter/options/models", () => {
    return db.query.AutoModelsTable.findMany({
      extras: {
        value: (table, { sql }) => sql`${table.id}`,
        label: (table, { sql }) => sql`${table.name}`,
      },
      columns: {},
      limit: 20,
    });
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
      columns: {
        id: true,
        slug: true,
        configuration_id: true,
        tech_param_id: true,
        equipment_id: true,
      },
      with: {
        configuration: {
          columns: {
            id: true,
            human_name: true,
            auto_class: true,
            boot_volume_max: true,
            boot_volume_min: true,
            doors_count: true,
          },
          with: {
            generation: {
              columns: {
                id: true,
                slug: true,
                name: true,
                cyrillic_name: true,
              },
              with: {
                model: {
                  columns: {
                    id: true,
                    slug: true,
                    name: true,
                    cyrillic_name: true,
                  },
                  with: {
                    mark: {
                      columns: {
                        id: true,
                        slug: true,
                        name: true,
                        cyrillic_name: true,
                      },
                      with: {
                        country: true,
                      },
                    },
                  },
                },
              },
            },
            promos: {
              columns: {
                id: true,
                name: true,
                url: true,
              },
              limit: 2,
            },
          },
        },
        tech_param: {
          columns: {
            id: true,
            slug: true,
            name: true,
            human_name: true,
            engine_order: true,
            engine_type: true,
          },
        },
        equipment: {
          columns: {
            id: true,
            slug: true,
            name: true,
          },
          with: {
            options: {
              columns: {
                id: true,
                name: true,
              },
              with: {
                group: true,
              },
              limit: 2,
            },
            packages: {
              columns: {
                id: true,
                name: true,
              },
              with: {
                options: {
                  columns: {
                    id: true,
                    name: true,
                  },
                  with: {
                    group: true,
                  },
                  limit: 2,
                },
              },
              limit: 2,
            },
          },
        },
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
                    in: ["0198842f-d1c2-77ab-97f5-7d1dc40eabe8"],
                  },
                },
              },
            },
          },
        },
        equipment: {
          packages: true,
        },
      },
      limit: 1,
    });
  });
