import type { IOperatorKey, IFilterExpression } from "./types.ts";
import { objEntries, objKeys } from "../utils/index.ts";
import type { Expression, ExpressionBuilder, SqlBool } from "kysely";
import { sql } from "kysely";
import type { DB } from "#root/db/db.js";

type IEB = ExpressionBuilder<DB, any>;

function pgArrayFromValues(values: unknown[]) {
  // ARRAY[$1, $2, ...] — не требует передачи "параметр-массивом" и тип выводится из контекста сравнения с колонкой
  return sql`ARRAY[${sql.join(values)}]`;
  // return sql`array[${sql.join(values.map((v) => sql.val(v)), sql`, `)}]`;
}

const OPERATION_CONDITION_MAP = {
  eq: (eb: IEB, field: string, val: any) => eb(field, "=", val),
  ne: (eb: IEB, field: string, val: any) => eb(field, "!=", val),
  lt: (eb: IEB, field: string, val: any) => eb(field, "<", val),
  lte: (eb: IEB, field: string, val: any) => eb(field, "<=", val),
  gt: (eb: IEB, field: string, val: any) => eb(field, ">", val),
  gte: (eb: IEB, field: string, val: any) => eb(field, ">=", val),

  inArray: (eb: IEB, field: string, val: any[]) => {
    // const arr = (val ?? []).filter((v) => v !== undefined);
    if (val.length === 0) return sql<SqlBool>`false`;
    return sql<SqlBool>`${eb.ref(field)} = any(${sql`ARRAY[${sql.join(
      val
    )}]`})`;
  },
  notInArray: (eb: IEB, field: string, val: any[]) => {
    // const arr = (val ?? []).filter((v) => v !== undefined);
    if (val.length === 0) return sql<SqlBool>`true`;
    return sql<SqlBool>`${eb.ref(field)} <> all(${sql`ARRAY[${sql.join(
      val
    )}]`})`;
  },

  isNull: (eb: IEB, field: string) => eb(field, "is", null),
  isNotNull: (eb: IEB, field: string) => eb(field, "is not", null),

  between: (eb: IEB, field: string, min: any, max: any) =>
    eb.and([eb(field, ">=", min), eb(field, "<=", max)]),
  notBetween: (eb: IEB, field: string, min: any, max: any) =>
    eb.or([eb(field, "<", min), eb(field, ">", max)]),

  like: (eb: IEB, field: string, val: string) => eb(field, "like", val),
  ilike: (eb: IEB, field: string, val: string) => eb(field, "ilike", val),
  notLike: (eb: IEB, field: string, val: string) => eb(field, "not like", val),
  notIlike: (eb: IEB, field: string, val: string) =>
    eb(field, "not ilike", val),

  // array ops (Postgres)
  arrayContains: (eb: IEB, field: string, val: any[]) => eb(field, "@>", val),
  arrayContained: (eb: IEB, field: string, val: any[]) => eb(field, "<@", val),
  arrayOverlaps: (eb: IEB, field: string, val: any[]) => eb(field, "&&", val),

  // jsonb array helpers
  isEmpty: (eb: IEB, field: string) =>
    eb(sql`jsonb_array_length(${eb.ref(field)})`, "=", 0),
  isNotEmpty: (eb: IEB, field: string) =>
    eb(sql`jsonb_array_length(${eb.ref(field)})`, ">", 0),
} as const satisfies Record<IOperatorKey, (...args: any[]) => Expression<any>>;

export function filterToWhereBase(
  eb: IEB,
  filter: IFilterExpression
): Expression<SqlBool> | undefined {
  const conditions: Expression<SqlBool>[] = [];

  for (const schemaKey of objKeys(filter)) {
    switch (schemaKey) {
      case "AND": {
        const AND = filter.AND;
        if (!Array.isArray(AND) || AND.length === 0) break;

        const and = AND.map((v) => filterToWhereBase(eb, v)).filter(
          (el): el is Expression<SqlBool> => el !== undefined
        );

        if (and.length === 1) conditions.push(and[0]);
        else if (and.length > 1) conditions.push(eb.and(and));
        break;
      }

      case "OR": {
        const OR = filter.OR;
        if (!Array.isArray(OR) || OR.length === 0) break;

        const or = OR.map((v) => filterToWhereBase(eb, v)).filter(
          (el): el is Expression<SqlBool> => el !== undefined
        );

        if (or.length === 1) conditions.push(or[0]);
        else if (or.length > 1) conditions.push(eb.or(or));
        break;
      }

      case "NOT": {
        const NOT = filter.NOT;
        if (!NOT) break;

        const not = filterToWhereBase(eb, NOT);
        if (not) conditions.push(eb.not(not));
        break;
      }

      case "FIELDS": {
        const FIELDS = filter.FIELDS;
        if (!FIELDS) break;

        for (const [field, conditionsMap] of objEntries(FIELDS)) {
          for (const [condition, val] of objEntries(conditionsMap!)) {
            if (condition === "between" || condition === "notBetween") {
              conditions.push(
                OPERATION_CONDITION_MAP[condition](eb, field, val.min, val.max)
              );
            } else if (condition === "isNull" || condition === "isNotNull") {
              conditions.push(OPERATION_CONDITION_MAP[condition](eb, field));
            } else {
              conditions.push(
                OPERATION_CONDITION_MAP[condition](eb, field, val)
              );
            }
          }
        }
        break;
      }

      default:
        throw new Error(`Invalid filter key ${schemaKey}`);
    }
  }

  if (conditions.length === 0) return undefined;
  if (conditions.length === 1) return conditions[0]!;
  return eb.and(conditions);
}

export function filterToWhere(
  eb: IEB,
  filter: IFilterExpression | undefined
): Expression<SqlBool> {
  if (!filter) return sql`true`;
  return filterToWhereBase(eb, filter) || sql`true`;
}
