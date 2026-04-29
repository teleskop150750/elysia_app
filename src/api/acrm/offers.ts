import Elysia from "elysia";
import { z } from "zod";
import { BasePaginationSchema } from "./schemas";

export const offers = new Elysia()
  .post(
    "/api/v2/offer-list/get",
    () => {
      return {
        success: true,
        data: null,
        pagination: {
          total: 50,
          per_page: 15,
          current_page: 1,
          last_page: 4,
          from: 1,
          to: 15,
        },
      };
    },
    {
      tags: ["Offers"],
      body: z.object({
        search: z.string().nullish().default(null),
        filters: z.record(z.string(), z.any()).nullish().default(null),
        pagination: z
          .strictObject({
            current_page: z.number().int().min(1).default(1),
            per_page: z.number().int().min(1).max(100).default(15),
          })
          .optional(),
      }),
      response: {
        200: z.strictObject({
          success: z.boolean(),
          data: z.null(),
          pagination: BasePaginationSchema,
        }),
      },
    },
  )
  .post(
    "/api/v2/offer-list/filter-options/get",
    () => {
      return {
        success: true,
        data: null,
      };
    },
    {
      tags: ["Offers"],
      response: {
        200: z.strictObject({
          success: z.boolean(),
          data: z.null(),
        }),
      },
    },
  );
