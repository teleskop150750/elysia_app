import Elysia from "elysia";
import { z } from "zod";
import { HandlesetMock, HandlesetSchema } from "./schemas";

export const handsets = new Elysia()
  .post(
    "/api/v2/workspace/:workspaceId/handset-list/get",
    () => {
      return {
        success: true,
        data: [HandlesetMock],
      };
    },
    {
      tags: ["Handsets"],
      response: {
        200: z.strictObject({
          success: z.boolean(),
          data: z.array(HandlesetSchema),
        }),
      },
    },
  )
  .put(
    "/api/v2/workspace/:workspaceId/handset/:handsetId/owner/update",
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
    "/api/v2/workspace/:workspaceId/current-handset/get",
    () => {
      return {
        success: true,
        data: HandlesetMock,
      };
    },
    {
      tags: ["Handsets"],
      response: {
        200: z.strictObject({
          success: z.boolean(),
          data: HandlesetSchema,
        }),
      },
    },
  )
  .delete(
    "/api/v2/workspace/:workspaceId/current-handset/delete",
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
