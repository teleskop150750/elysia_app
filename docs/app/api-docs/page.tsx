import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/layouts/docs/page';
import { APIPage, OPENAPI_SPEC_PATH } from '../../lib/openapi';

export default function Page() {
  return (
    <DocsPage full>
      <DocsTitle>ACRM API Reference</DocsTitle>
      <DocsDescription>
        Interactive API documentation for the ACRM API.
      </DocsDescription>
      <DocsBody>
        <APIPage document={OPENAPI_SPEC_PATH} />
      </DocsBody>
    </DocsPage>
  );
}
