import Elysia from "elysia";
import { z } from "zod";
import {
  BasePaginationSchema,
  BasePipelineMock,
  objOmit,
  PipelineSchema,
} from "./schemas";

export const pipelines = new Elysia()
  .post(
    "/api/v2/workspace/:workspaceId/pipeline-list/get",
    () => {
      return {
        success: true,
        data: [
          {
            ...objOmit(BasePipelineMock, [
              "tag_list",
              "sale_type",
              "trade_in",
              "disposal",
            ]),
            comment: "",
          },
        ],
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
      tags: ["Pipelines"],
      body: z.object({
        search: z.string().nullish().default(null),
        category: z
          .enum([
            "hot",
            "new_no_answer",
            "burned_my",
            "burned",
            "urgent",
            "visit_today",
            "visit_tomorrow",
          ])
          .nullish()
          .default(null),
        metric: z.string().nullish().default(null),
        dimensions: z
          .array(
            z.strictObject({
              key: z.string(),
              value: z.string(),
            }),
          )
          .nullish()
          .default(null),
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
          data: z.array(
            z.strictObject({
              ...objOmit(PipelineSchema.shape, [
                "tag_list",
                "sale_type",
                "trade_in",
                "disposal",
              ]),
              comment: z.nullable(z.string()),
            }),
          ),
          pagination: BasePaginationSchema,
        }),
      },
    },
  )
  .post(
    "/api/v2/workspace/:workspaceId/pipeline-list/report/get",
    () => {
      return {
        success: true,
        data: [
          {
            groupings: {
              region: {
                id: "region",
                label: "Самара",
                value: "1_id",
              },
            },
            metrics: {
              count: {
                id: "count",
                value: 10,
              },
            },
          },
        ],
      };
    },
    {
      tags: ["Pipelines"],
      body: z.strictObject({
        metrics: z.array(z.string()),
        dimensions: z.array(z.string()),
      }),
      response: {
        200: z.strictObject({
          success: z.boolean(),
          data: z.array(
            z.strictObject({
              groupings: z.record(
                z.string(),
                z.strictObject({
                  id: z.string(),
                  label: z.string(),
                  value: z.any(),
                }),
              ),
              metrics: z.record(
                z.string(),
                z.strictObject({
                  id: z.string(),
                  value: z.number(),
                }),
              ),
            }),
          ),
        }),
      },
    },
  )
  .post(
    "/api/v2/workspace/:workspaceId/pipeline-list/metric-trend/get",
    () => {
      return {
        success: true,
        data: [
          {
            datetime: "2023-01-01T00:00:00Z",
            groupings: {
              region: {
                id: "region",
                label: "Самара",
                value: "1_id",
              },
            },
            metrics: {
              count: {
                id: "count",
                value: 10,
              },
            },
          },
        ],
      };
    },
    {
      tags: ["Pipelines"],
      body: z.strictObject({
        periodGroup: z.string(),
        metric: z.array(z.string()),
        dimensions: z.array(z.string()),
      }),
      response: {
        200: z.strictObject({
          success: z.boolean(),
          data: z.array(
            z.strictObject({
              datetime: z.iso.datetime(),
              groupings: z.record(
                z.string(),
                z.strictObject({
                  id: z.string(),
                  label: z.string(),
                  value: z.any(),
                }),
              ),
              metrics: z.record(
                z.string(),
                z.strictObject({
                  id: z.string(),
                  value: z.number(),
                }),
              ),
            }),
          ),
        }),
      },
    },
  )
  .post(
    "/api/v2/workspace/:workspaceId/pipeline-list/filter-options/get",
    () => {
      return {
        success: true,
        data: null,
      };
    },
    {
      tags: ["Pipelines"],
      body: z
        .object({
          search: z.string().nullish().default(null),
          category: z
            .enum([
              "hot",
              "new_no_answer",
              "burned_my",
              "burned",
              "urgent",
              "visit_today",
              "visit_tomorrow",
            ])
            .nullish()
            .default(null),
          metric: z.string().nullish().default(null),
          dimensions: z
            .array(
              z.strictObject({
                id: z.string(),
                value: z.string(),
              }),
            )
            .nullish()
            .default(null),
          filters: z.record(z.string(), z.any()).nullish().default(null),
          pagination: z
            .strictObject({
              current_page: z.number().int().min(1).default(1),
              per_page: z.number().int().min(1).max(100).default(15),
            })
            .optional(),
        })
        .optional(),
      response: {
        200: z.strictObject({
          success: z.boolean(),
          data: z.null(),
        }),
      },
    },
  )
  .post(
    "/api/v2/workspace/:workspaceId/pipeline/:pipelineId/get",
    () => {
      return {
        success: true,
        data: {
          ...BasePipelineMock,

          other_pipeline_list: [],
        },
      };
    },
    {
      tags: ["Pipelines"],
      response: {
        200: z.strictObject({
          success: z.boolean(),
          data: z.strictObject({
            ...PipelineSchema.shape,

            other_pipeline_list: z.array(
              z.strictObject({
                id: z.string(),
                status_id: z.string(),
              }),
            ),
          }),
        }),
      },
    },
  )
  .put(
    "/api/v2/workspace/:workspaceId/pipeline/:pipelineId/customer/update",
    () => {
      return {
        success: true,
      };
    },
    {
      tags: ["Pipelines"],
      body: z.strictObject({
        id: z.string(),
      }),
      response: {
        200: z.strictObject({
          success: z.boolean(),
        }),
      },
    },
  )
  .post(
    "/api/v2/workspace/:workspaceId/pipeline/:pipelineId/customer/feed/get",
    () => {
      return {
        success: true,
        data: [
          {
            id: "123",
            type: "comment",
            operator: {
              id: "789",
              name: "John Smith",
            },
            pyaload: {
              text: "This is a comment",
            },
            order_id: 1,
            created_at: "2023-01-01T00:00:00Z",
          } as const,
        ],
      };
    },
    {
      tags: ["Pipelines"],
      response: {
        200: z.strictObject({
          success: z.boolean(),
          data: z.array(
            z.discriminatedUnion("type", [
              z.strictObject({
                id: z.string(),
                type: z.literal("comment"),
                operator: z
                  .nullish(
                    z.strictObject({
                      id: z.string(),
                      name: z.string(),
                    }),
                  )
                  .default(null),
                pyaload: z.strictObject({
                  text: z.string(),
                }),
                order_id: z.number(),
                created_at: z.iso.datetime(),
              }),
            ]),
          ),
        }),
      },
    },
  )
  .post(
    "/api/v2/workspace/:workspaceId/pipeline/:pipelineId/feed/create",
    () => {
      return {
        success: true,
        data: [
          {
            id: "123",
            type: "comment",
            operator: {
              id: "789",
              name: "John Smith",
            },
            pyaload: {
              text: "This is a comment",
            },
            order_id: 1,
            created_at: "2023-01-01T00:00:00Z",
          } as const,
        ],
      };
    },
    {
      tags: ["Pipelines"],
      body: z.discriminatedUnion("type", [
        z.strictObject({
          type: z.literal("comment"),
          pyaload: z.strictObject({
            text: z.string(),
          }),
        }),
      ]),
      response: {
        200: z.strictObject({
          success: z.boolean(),
        }),
      },
    },
  );
