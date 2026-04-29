import Elysia from "elysia";
import { z } from "zod";

export const clients = new Elysia().post(
  "/api/v2/client-list/get",
  () => {
    return {
      success: true,
      data: [
        {
          id: "1",
          name: "Client 1",
        },
      ],
    };
  },
  {
    tags: ["Clients"],
    response: {
      200: z.strictObject({
        success: z.boolean(),
        data: z.array(
          z.strictObject({
            id: z.string(),
            name: z.string(),
          }),
        ),
      }),
    },
  },
);
