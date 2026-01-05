import type { IConditionKey, ITableFilter } from "./types.ts";
import { objEntries, objKeys } from "../utils/index.ts";
import type {
  Expression,
  ExpressionBuilder,
  SqlBool,
  ExpressionWrapper,
} from "kysely";
import { sql } from "kysely";
import type { DB } from "#root/db/db.js";

type IEB = ExpressionBuilder<DB, any>;
type IEW = ExpressionWrapper<DB, any, any>;

const OPERATION_CONDITION_MAP = {
  eq: (ed: IEB, field: string, val: any) => ed(field, "=", val),
  ne: (ed: IEB, field: string, val: any) => ed(field, "!=", val),
  lt: (ed: IEB, field: string, val: any) => ed(field, "<", val),
  lte: (ed: IEB, field: string, val: any) => ed(field, "<=", val),
  gt: (ed: IEB, field: string, val: any) => ed(field, ">", val),
  gte: (ed: IEB, field: string, val: any) => ed(field, ">=", val),
  inArray: (ed: IEB, field: string, val: any[]) => ed(field, "in", val),
  notInArray: (ed: IEB, field: string, val: any[]) => ed(field, "not in", val),
  isNull: (ed: IEB, field: string) => ed(field, "is", null),
  isNotNull: (ed: IEB, field: string) => ed(field, "is not", null),
  between: (ed: IEB, field: string, min: any, max: any) =>
    ed.and([ed(field, ">=", min), ed(field, "<=", max)]),
  notBetween: (ed: IEB, field: string, min: any, max: any) =>
    ed.or([ed(field, "<", min), ed(field, ">", max)]),
  like: (ed: IEB, field: string, val: string) => ed(field, "like", val),
  ilike: (ed: IEB, field: string, val: string) => ed(field, "ilike", val),
  notLike: (ed: IEB, field: string, val: string) => ed(field, "not like", val),
  notIlike: (ed: IEB, field: string, val: string) =>
    ed(field, "not ilike", val),
  //array operations
  arrayContains: (ed: IEB, field: string, val: any[]) => ed(field, "@>", val),
  arrayContained: (ed: IEB, field: string, val: any[]) => ed(field, "<@", val),
  arrayOverlaps: (ed: IEB, field: string, val: any[]) => ed(field, "&&", val),
  isEmpty: (ed: IEB, field: string) =>
    ed(sql`jsonb_array_length(${ed.ref(field)})`, "=", 0),
  isNotEmpty: (ed: IEB, field: string) =>
    ed(sql`jsonb_array_length(${ed.ref(field)})`, ">", 0),
} as const satisfies Record<IConditionKey, (...args: any[]) => IEW>;

export function filterToWhereBase(
  eb: IEB,
  filter: ITableFilter
): Expression<SqlBool> | undefined {
  const conditions: Expression<SqlBool>[] = [];
  for (const schenaKey of objKeys(filter)) {
    switch (schenaKey) {
      case "AND": {
        const AND = filter.AND;
        if (!Array.isArray(AND))
          throw new Error("'and' operator must be a non-empty array");
        const and = AND.map((v) => filterToWhereBase(eb, v)).filter(
          (el) => el !== undefined
        );

        switch (and.length) {
          case 0: {
            break;
          }
          case 1: {
            conditions.push(and[0]!);
            break;
          }
          default: {
            conditions.push(eb.and(and));
          }
        }
        break;
      }
      case "OR": {
        const OR = filter.OR;
        if (!Array.isArray(OR))
          throw new Error("'or' operator must be a non-empty array");
        const or = OR.map((v) => filterToWhereBase(eb, v)).filter(
          (el) => el !== undefined
        );
        switch (or.length) {
          case 0: {
            break;
          }
          case 1: {
            conditions.push(or[0]!);
            break;
          }
          default: {
            conditions.push(eb.or(or));
          }
        }
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
        for (const [field, conditionsMap] of objEntries(filter.FIELDS)) {
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
        throw new Error(`Invalid filter key ${schenaKey}`);
    }
  }

  switch (conditions.length) {
    case 0:
      return undefined;
    case 1:
      return conditions[0]!;
    default:
      return eb.and(conditions);
  }
}

export function filterToWhere(
  eb: IEB,
  filter: ITableFilter | undefined
): Expression<SqlBool> {
  if (!filter) return sql`true`;
  return filterToWhereBase(eb, filter) || sql`true`;
}
