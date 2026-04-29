import Elysia from "elysia";
import { z } from "zod";

export const customers = new Elysia().post(
  "/api/v2/workspace/:workspaceId/customer-list/get",
  () => {
    return {
      success: true,
      data: [
        {
          id: "1",
          name: "Customer 1",
        },
      ],
    };
  },
  {
    tags: ["Customers"],
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
