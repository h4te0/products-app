import { Heart } from 'lucide-react';

import { useProductsStore } from '@/entities/product';
import { cn } from '@/shared/lib/tailwind-merge';

interface Props {
  className?: string;
  id: number;
  isFavorited?: boolean;
}

export const AddToFavoritesButton = ({ className, id, isFavorited }: Props) => {
  const addToFavorites = useProductsStore((state) => state.addToFavorites);

  const addToFavoritesHandle = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    addToFavorites(id, isFavorited);
  };

  return (
    <div
      className={cn(className, 'aspect-square hover:scale-[1.05] cursor-pointer')}
      onClick={addToFavoritesHandle}>
      <Heart
        className="w-full h-full hover:opacity-80 ease-in-out duration-200"
        strokeWidth={1.5}
        fill={isFavorited ? '#ff0000' : 'transparent'}
        color={isFavorited ? '#ff0000' : 'currentColor'}
      />
    </div>
  );
};
