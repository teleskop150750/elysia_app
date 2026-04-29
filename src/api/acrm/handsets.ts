import Elysia from "elysia";
import { z } from "zod";
import { HandsetMock, HandsetSchema } from "./schemas";

export const handsets = new Elysia()
  .post(
    "/api/v2/workspace/:workspaceId/handset-list/get",
    () => {
      return {
        success: true,
        data: [HandsetMock],
      };
    },
    {
      tags: ["Handsets"],
      response: {
        200: z.strictObject({
          success: z.boolean(),
          data: z.array(HandsetSchema),
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
        data: HandsetMock,
      };
    },
    {
      tags: ["Handsets"],
      response: {
        200: z.strictObject({
          success: z.boolean(),
          data: HandsetSchema,
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
