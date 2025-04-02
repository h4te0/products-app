import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useShallow } from 'zustand/shallow';
import Link from 'next/link';

import { AddToFavoritesButton } from '@/features/add-to-favorites';
import { DeleteProductButton } from '@/features/delete-product';
import {
  type IProduct,
  ProductCard,
  ProductCardSkeleton,
  useProductsStore,
} from '@/entities/product';

import { ProductsPagination } from './products-pagination';

export const ProductsList = () => {
  const searchParams = useSearchParams();
  const page = searchParams?.get('page') || 1;
  const skip = (Number(page) - 1) * 8;

  const { fetchProducts, isLoading, search } = useProductsStore(
    useShallow((state) => ({
      fetchProducts: state.fetchProducts,
      isLoading: state.isLoading,
      search: state.search,
    })),
  );

  const products = useProductsStore(
    useShallow((state) => {
      if (state.filter) {
        return state.products.filter(
          (obj) => obj.isFavorited === true && obj.title.toLowerCase().includes(search),
        );
      } else {
        return state.products.filter((obj) => obj.title.toLowerCase().includes(search));
      }
    }),
  );

  useEffect(() => {
    fetchProducts();
  }, []);

  if (isLoading)
    return (
      <ul className="grid grid-cols-4 gap-4 max-laptop:grid-cols-3 max-tablet:grid-cols-2 max-phone:grid-cols-1">
        {Array.from({ length: 8 }).map((_, i) => (
          <li key={i}>
            <ProductCardSkeleton />
          </li>
        ))}
      </ul>
    );

  if (!products.length)
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl text-gray-600">Товары не найдены</h1>
      </div>
    );

  return (
    <>
      <ul className="grid grid-cols-4 gap-4 max-laptop:grid-cols-3 max-tablet:grid-cols-2 max-phone:grid-cols-1">
        {products.slice(skip, skip + 8).map((product: IProduct) => (
          <li key={product.id}>
            <Link href={`/product/${product.id}`}>
              <ProductCard
                {...product}
                AddToFavoritesButton={AddToFavoritesButton}
                DeleteProductButton={DeleteProductButton}
              />
            </Link>
          </li>
        ))}
      </ul>
      <ProductsPagination
        classname="my-6"
        page={page}
        skip={skip}
        totalPages={Math.ceil(products.length / 8)}
        totalCount={products.length}
      />
    </>
  );
};
