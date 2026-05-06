import path from "node:path";
import { defaultShikiFactory } from "fumadocs-core/highlight/shiki/full";
import { createOpenAPI } from "fumadocs-openapi/server";
import { createAPIPage } from "fumadocs-openapi/ui";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export const OPENAPI_SPEC_PATH = path.join(
  __dirname,
  "../../public/openapi.yaml",
);

export const openapi = createOpenAPI({
  input: [OPENAPI_SPEC_PATH],
});

export const APIPage = createAPIPage(openapi, {
  shiki: defaultShikiFactory,
  shikiOptions: {
    themes: { light: "github-light", dark: "github-dark" },
  },
});
