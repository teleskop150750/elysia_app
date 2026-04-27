import Elysia from "elysia";
import { BaseListSchemaVali, v } from "../utils";

interface IWorkspace {
  id: string;
  name: string;
  disabled: boolean;
  children: IWorkspace[] | null;
}

const WorkspaceSchema: v.GenericSchema<IWorkspace> = v.object({
  id: v.string(),
  name: v.string(),
  disabled: v.boolean(),
  children: v.nullable(v.array(v.lazy(() => WorkspaceSchema))),
});

interface IStatus {
  id: string;
  name: string;
  disabled: boolean;
  children: IStatus[] | null;
}

const StatusSchema: v.GenericSchema<IStatus> = v.object({
  id: v.string(),
  name: v.string(),
  color: v.string(),
  disabled: v.boolean(),
  children: v.nullable(v.array(v.lazy(() => StatusSchema))),
});

export const workspaces = new Elysia()
  .post(
    "/api/v2/workspaces/get",
    () => {
      return {
        success: true,
        data: [
          {
            id: "1",
            name: "Workspace 1",
            disabled: false,
            children: [
              {
                id: "1-1",
                name: "Workspace 1-1",
                disabled: false,
                children: [],
              },
              {
                id: "1-2",
                name: "Workspace 1-2",
                disabled: true,
                children: [],
              },
            ],
          },
        ],
      };
    },
    {
      tags: ["Workspaces"],
      response: {
        200: v.object({
          success: v.boolean(),
          data: v.array(WorkspaceSchema),
        }),
      },
    },
  )
  .post(
    "/api/v2/workspaces/:workspaceid/settings/get",
    () => {
      return {
        success: true,
        data: {
          region_list: [
            {
              id: "1",
              name: "Region 1",
            },
          ],
          pipeline_tag_list: [
            {
              id: "1",
              name: "Tag 1",
            },
          ],
          pipeline_status_list: [
            {
              id: "1",
              name: "Status 1",
              color: "#ff0000",
              disabled: false,
              children: [
                {
                  id: "1-1",
                  name: "Status 1-1",
                  color: "#00ff00",
                  disabled: false,
                  children: [],
                },
                {
                  id: "1-2",
                  name: "Status 1-2",
                  color: "#0000ff",
                  disabled: true,
                  children: [],
                },
              ],
            },
          ],
        },
      };
    },
    {
      tags: ["Workspaces"],
      response: {
        200: v.object({
          success: v.boolean(),
          data: v.object({
            region_list: BaseListSchemaVali,
            pipeline_tag_list: BaseListSchemaVali,
            pipeline_status_list: v.array(StatusSchema),
          }),
        }),
      },
    },
  );
