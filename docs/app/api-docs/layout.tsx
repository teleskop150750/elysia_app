import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import type { Root } from 'fumadocs-core/page-tree';

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
