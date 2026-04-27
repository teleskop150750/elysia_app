import Elysia from "elysia";
import { z } from "zod";

export const pipelines = new Elysia().post(
  "/api/v2/pipelines/:pipelineId",
  () => {
    return {
      success: true,
      data: {
        id: "123",
        active_order_id: null,

        status_id: "456",
        operator_id: "789",

        rating: 8,
        tag_list: ["tag1", "tag2"],

        call_at: "2023-01-01T00:00:00Z",
        visit_at: "2023-01-02T00:00:00Z",
        sale_type: "retail",
        trade_in: true,
        disposal: false,

        is_captcha: false,
        is_spam: false,

        lead_type: "organic",
        source_id: "654",

        closed_at: null,
        created_at: "2023-01-01T00:00:00Z",
        updated_at: "2023-01-01T00:00:00Z",

        client: {
          id: "321",
          name: "Jane Doe",
          region_id: "654",
          phones: [
            {
              id: "987",
              label: "+7 (123) 456-78-90",
            },
          ],
        },

        purchased_car: null,
        offer: null,
        desired_car: null,

        other_order_list: [],
      },
    };
  },
  {
    tags: ["Pipelines"],
    response: {
      200: z.object({
        success: z.boolean(),
        data: z.object({
          id: z.string(),
          active_order_id: z.nullable(z.string()),

          status_id: z.string(),
          operator_id: z.string(),

          rating: z.nullable(z.number().min(1).max(10)),
          tag_list: z.array(z.string()),

          call_at: z.nullable(z.string()),
          visit_at: z.nullable(z.string()),
          sale_type: z.nullable(z.string()),
          trade_in: z.nullable(z.boolean()),
          disposal: z.nullable(z.boolean()),

          is_spam: z.boolean(),
          is_captcha: z.boolean(),

          lead_type: z.nullable(z.string()),
          source_id: z.nullable(z.string()),

          closed_at: z.nullable(z.string()),
          created_at: z.string(),
          updated_at: z.string(),

          client: z.object({
            id: z.string(),
            name: z.nullable(z.string()),
            region_id: z.nullable(z.string()),
            phones: z.array(
              z.object({
                id: z.string(),
                label: z.string(),
              }),
            ),
          }),

          purchased_car: z.nullable(
            z.object({
              id: z.string(),
              name: z.string(),
            }),
          ),
          offer: z.nullable(
            z.object({
              id: z.string(),
              name: z.string(),
            }),
          ),
          desired_car: z.nullable(
            z.object({
              id: z.string(),
              name: z.string(),
            }),
          ),

          other_order_list: z.array(
            z.object({
              id: z.string(),
              name: z.string(),
              status: z.object({
                id: z.string(),
                name: z.string(),
                color: z.string(),
              }),
            }),
          ),
        }),
      }),
    },
  },
);
