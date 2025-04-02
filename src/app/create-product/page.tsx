import { CreateProductPage } from '@/pages/create-product';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Создание товара',
};

export default function CreateProduct() {
  return <CreateProductPage />;
}
