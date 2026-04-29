import Elysia from "elysia";
import { z } from "zod";

export const session = new Elysia()
  .post(
    "/api/v2/sessions/me/get",
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
    "/api/v2/sessions/create",
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
  .post(
    "/api/v2/sessions/current/delete",
    () => {
      return {
        success: true,
      };
    },
    {
      tags: ["Sessions"],
    },
  );
