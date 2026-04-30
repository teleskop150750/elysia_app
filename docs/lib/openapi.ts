import { createOpenAPI } from 'fumadocs-openapi/server';
import { createAPIPage } from 'fumadocs-openapi/ui';
import { defaultShikiFactory } from 'fumadocs-core/highlight/shiki/full';
import path from 'node:path';

export const OPENAPI_SPEC_PATH = path.join(
  process.cwd(),
  '../public/openapi.yaml',
);

export const openapi = createOpenAPI({
  input: [OPENAPI_SPEC_PATH],
});

export const APIPage = createAPIPage(openapi, {
  shiki: defaultShikiFactory,
  shikiOptions: {
    themes: { light: 'github-light', dark: 'github-dark' },
  },
});
