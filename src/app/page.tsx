import { CatalogPage } from '@/pages/catalog';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Главная',
};

export default function Home() {
  return <CatalogPage />;
}
