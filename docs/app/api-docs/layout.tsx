import type { Root } from 'fumadocs-core/page-tree';
import type { ReactNode } from 'react';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';

const tree: Root = {
  name: 'ACRM API',
  children: [
    {
      type: 'page',
      name: 'API Reference',
      url: '/api-docs',
    },
  ],
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout tree={tree} nav={{ title: 'ACRM API Docs' }}>
      {children}
    </DocsLayout>
  );
}
