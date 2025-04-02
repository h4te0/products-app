'use client';

import { useEffect, useState } from 'react';
import { useShallow } from 'zustand/shallow';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, Edit } from 'lucide-react';

import { useProductsStore } from '@/entities/product';
import { AddToFavoritesButton } from '@/features/add-to-favorites';
import { DeleteProductButton } from '@/features/delete-product';

import { ProductPageSkeleton } from './product-page-skeleton';
import { ProductEdit } from './product-edit';
import { Container } from '@/shared/ui/container';

interface Props {
  id: number;
}

const ProductPage = ({ id }: Props) => {
  const { setCurrentProduct, product, isLoading } = useProductsStore(
    useShallow((state) => ({
      product: state.currentProduct,
      setCurrentProduct: state.setCurrentProduct,
      isLoading: state.isLoading,
    })),
  );

  useEffect(() => {
    setCurrentProduct(id);
  }, []);

  const [isEdit, setIsEdit] = useState(false);

  if (isEdit) return <ProductEdit setIsEdit={setIsEdit} />;
  if (isLoading) return <ProductPageSkeleton />;

  return (
    <Container>
      <div className="flex justify-between items-center my-4">
        <div className="flex items-center gap-4">
          <Link href={'/'} className="w-8 h-8 flex justify-center items-center">
            <ChevronLeft className="w-full h-full" />
          </Link>
          <h1 className="text-3xl font-bold">{product?.title}</h1>
        </div>
        <div className="flex gap-4 max-phone:flex-col">
          <div
            className="aspect-square hover:scale-[1.05] cursor-pointer h-8"
            onClick={() => setIsEdit(true)}>
            <Edit
              strokeWidth={1.5}
              className="w-full h-full hover:opacity-80 ease-in-out duration-200"
            />
          </div>
          <DeleteProductButton id={id} className="h-8" />
          <AddToFavoritesButton id={id} isFavorited={product?.isFavorited} className="h-8" />
        </div>
      </div>
      <p className="font-bold text-2xl text-gray-600">{product?.price} $</p>
      <div className="flex gap-10 justify-between mt-4 max-tablet:flex-col">
        <Image
          src={product?.image || 'https://h4te0.github.io/products-app/placeholder.webp'}
          alt={product?.title}
          width={600}
          height={600}
          className="aspect-square object-cover rounded-lg drop-shadow-2xl"
        />
        <p className="text-lg font-light text-gray-800 w-full">{product?.description}</p>
      </div>
    </Container>
  );
};

export default ProductPage;
