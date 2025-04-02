'use client';

import { Suspense } from 'react';
import { useShallow } from 'zustand/shallow';
import Link from 'next/link';
import { Heart, PlusSquare } from 'lucide-react';

import { useProductsStore } from '@/entities/product';

import { Search } from '@/widgets/search';
import { Switch } from '@/shared/ui/switch';
import { Container } from '@/shared/ui/container';
import { ProductsList } from './products-list';

const CatalogPage = () => {
  const { filter, setFilter } = useProductsStore(
    useShallow((state) => ({
      filter: state.filter,
      setFilter: state.setFilter,
    })),
  );

  return (
    <Container>
      <div className="flex justify-between items-center max-tablet:flex-col max-tablet:gap-4">
        <h1 className="text-3xl font-bold my-4">Список товаров</h1>
        <Search />
        <div className="flex gap-8 items-center max-tablet:w-full">
          <div className="flex items-center gap-2 max-tablet:w-full">
            <Switch
              checked={filter}
              onCheckedChange={(v: boolean) => setFilter(v)}
              className="cursor-pointer"
            />
            <p className="text-lg max-laptop:hidden">Показать только избранные</p>
            <Heart color="red" fill="red" className="hidden max-laptop:block" />
          </div>
          <Link href={'/create-product'}>
            <PlusSquare
              width={36}
              height={36}
              strokeWidth={1}
              className="hover:fill-gray-200 cursor-pointer"
            />
          </Link>
        </div>
      </div>
      <Suspense>
        <ProductsList />
      </Suspense>
    </Container>
  );
};

export default CatalogPage;
