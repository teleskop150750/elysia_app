import Elysia from "elysia";
import { z } from "zod";

export const handsets = new Elysia()
  .post(
    "/api/v2/workspace/:workspaceIdhandset-list/get",
    () => {
      return {
        success: true,
        data: [
          {
            id: "1",
            owner: {
              id: 1,
              name: "Operator 1",
            },
          },
        ],
      };
    },
    {
      tags: ["Handsets"],
      response: {
        200: z.strictObject({
          success: z.boolean(),
          data: z.array(
            z.strictObject({
              id: z.string(),
              owner: z
                .nullable(
                  z.strictObject({
                    id: z.number(),
                    name: z.string(),
                  }),
                )
                .default(null),
            }),
          ),
        }),
      },
    },
  )
  .put(
    "/api/v2/workspace/:workspaceIdhandset/:handsetId/owner/update",
    () => {
      return {
        success: true,
      };
    },
    {
      tags: ["Handsets"],
      response: {
        200: z.strictObject({
          success: z.boolean(),
        }),
      },
    },
  )
  .post(
    "/api/v2/workspace/:workspaceIdcurrent-handset/get",
    () => {
      return {
        success: true,
        data: {
          id: "1",
        },
      };
    },
    {
      tags: ["Handsets"],
      response: {
        200: z.strictObject({
          success: z.boolean(),
          data: z.strictObject({
            id: z.nullish(z.string()),
          }),
        }),
      },
    },
  )
  .delete(
    "/api/v2/workspace/:workspaceIdcurrent-handset/delete",
    () => {
      return {
        success: true,
      };
    },
    {
      tags: ["Handsets"],
      response: {
        200: z.strictObject({
          success: z.boolean(),
        }),
      },
    },
  );
