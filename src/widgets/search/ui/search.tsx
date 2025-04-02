import debounce from 'lodash.debounce';

import { useProductsStore } from '@/entities/product';

import { Input } from '@/shared/ui/input';

import type { ChangeEvent } from 'react';

export const Search = () => {
  const setSearch = useProductsStore((state) => state.setSearch);

  const handleSearch = debounce((e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.toLowerCase());
  }, 500);

  return (
    <Input
      onChange={handleSearch}
      className="absolute -translate-x-1/2 left-1/2 w-80 max-tablet:relative max-tablet:w-full"
      placeholder="Поиск"
    />
  );
};
