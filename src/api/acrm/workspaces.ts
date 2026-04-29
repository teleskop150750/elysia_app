import Elysia from "elysia";
import { z } from "zod";
import {
  PipelineStatusMock,
  PipelineStatusSchema,
  PipelineTagMock,
  PipelineTagSchema,
  RegionMock,
  RegionSchema,
  SourceMock,
  SourceSchema,
  WorkspaceSchema,
} from "./schemas";

export const workspaces = new Elysia()
  .post(
    "/api/v2/workspace-list/get",
    () => {
      return {
        success: true,
        data: [
          {
            id: "1",
            name: "Workspace 1",
            disabled: false,
            parent_id: null,
          },
        ],
      };
    },
    {
      tags: ["Workspaces"],
      response: {
        200: z.strictObject({
          success: z.boolean(),
          data: z.array(WorkspaceSchema),
        }),
      },
    },
  )
  .post(
    "/api/v2/workspace/:workspaceId/settings/get",
    () => {
      return {
        success: true,
        data: {
          source_list: [SourceMock],
          region_list: [RegionMock],
          pipeline_tag_list: [PipelineTagMock],
          pipeline_status_list: [PipelineStatusMock],
          pipeline_visited_status_list: [PipelineStatusMock],
          report_settings: {
            date_field_list: [
              {
                id: "created_at",
                label: "Created At",
              },
              {
                id: "updated_at",
                label: "Updated At",
              },
            ],
            dimension_list: [
              {
                id: "region_id",
                treeType: "leaf" as const,
                parent_id: null,
                label: "Region",
                key: "region_id",
                value: "region_name",
              },
            ],
            metric_list: [
              {
                id: "pipeline_count",
                treeType: "leaf" as const,
                parent_id: null,
                label: "Pipeline Count",
                key: "pipeline_count",
                value: "pipeline_count",
              },
            ],
          },
        },
      };
    },
    {
      tags: ["Workspaces"],
      response: {
        200: z.strictObject({
          success: z.boolean(),
          data: z.strictObject({
            source_list: SourceSchema.array(),
            region_list: RegionSchema.array(),
            pipeline_tag_list: PipelineTagSchema.array(),
            pipeline_status_list: z.array(PipelineStatusSchema),
            report_settings: z.strictObject({
              dimension_list: z.array(
                z.discriminatedUnion("treeType", [
                  z.strictObject({
                    id: z.string(),
                    treeType: z.literal("branch"),
                    parent_id: z.nullable(z.string()),
                    label: z.string(),
                  }),
                  z.strictObject({
                    id: z.string(),
                    treeType: z.literal("leaf"),
                    parent_id: z.nullable(z.string()),
                    label: z.string(),
                    value: z.string(),
                  }),
                ]),
              ),
              metric_list: z.array(
                z.discriminatedUnion("treeType", [
                  z.strictObject({
                    id: z.string(),
                    treeType: z.literal("branch"),
                    parent_id: z.nullable(z.string()),
                    label: z.string(),
                  }),
                  z.strictObject({
                    id: z.string(),
                    treeType: z.literal("leaf"),
                    parent_id: z.nullable(z.string()),
                    label: z.string(),
                    value: z.string(),
                  }),
                ]),
              ),
            }),
          }),
        }),
      },
    },
  );
