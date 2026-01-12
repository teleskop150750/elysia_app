import { Elysia } from "elysia";
import { db } from "~/db/drizzle.ts";

const DemoFilter = {
  model: {
    mark: {
      country: {
        id: {
          in: ["01988432-d400-773f-b544-9b6ab4e714d5"],
        },
      },
    },
  },
};

async function getMarks(filter: any) {
  return db.query.AutoMarksTable.findMany({
    extras: {
      value: (table, { sql }) => sql`${table.id}`,
      label: (table, { sql }) => sql`${table.name}`,
    },
    columns: {},
    where: filter,
    limit: 5,
  });
}
async function getModels(filter: any) {
  return db.query.AutoModelsTable.findMany({
    extras: {
      value: (table, { sql }) => sql`${table.id}`,
      label: (table, { sql }) => sql`${table.name}`,
    },
    columns: {},
    where: filter,
    limit: 5,
  });
}

function getFiltersForField<T>(field: string, filter: T): T {
  // исключить из фильтра те фильтры, которые относятся к полю field
  // например, для field = "mark" нужно исключить из фильтра все, что внутри model.mark
  // Чтобы запрос выдобавал все доступные марки, которые пользователь может выбрать на фронтенде
  return filter;
}

export const filter = new Elysia().all("/filter/options/demo", async () => {
  const [marks, models] = await Promise.all([
    getMarks(getFiltersForField("mark", DemoFilter.model.mark)),
    getModels(getFiltersForField("model", DemoFilter.model)),
  ]);
  return {
    marks,
    models,
  };
});
