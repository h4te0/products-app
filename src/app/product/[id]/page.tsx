import { ProductPage } from '@/pages/product';

interface Props {
  params: Promise<{ id: number }>;
}

export const generateMetadata = async ({ params }: Props) => {
  const id = (await params).id;

  return {
    title: 'Товар номер ' + id,
  };
};

export default async function Product({ params }: Props) {
  const { id } = await params;

  return <ProductPage id={id} />;
}
