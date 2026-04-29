import Elysia from "elysia";
import { z } from "zod";

export const session = new Elysia()
  .post(
    "/api/v2/me/get",
    () => {
      return {
        success: true,
        data: {
          id: "123",
          name: "John Doe",
          email: "john.doe@example.com",
        },
      };
    },
    {
      tags: ["Sessions"],
      response: {
        200: z.object({
          success: z.boolean(),
          data: z.object({
            id: z.string(),
            email: z.string(),
            name: z.string(),
          }),
        }),
      },
    },
  )
  .post(
    "/api/v2/current-session/create",
    () => {
      return {
        success: true,
      };
    },
    {
      body: z.object({
        email: z.string(),
        password: z.string().min(6),
      }),
      response: {
        200: z.strictObject({
          success: z.boolean(),
        }),
      },
      tags: ["Sessions"],
    },
  )
  .delete(
    "/api/v2/current-session/delete",
    () => {
      return {
        success: true,
      };
    },
    {
      tags: ["Sessions"],
    },
  );
