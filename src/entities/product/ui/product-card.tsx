import Image from 'next/image';

import type { IProduct } from '../model/types';

interface Props extends IProduct {
  AddToFavoritesButton: React.FC<{ id: number; isFavorited?: boolean; className?: string }>;
  DeleteProductButton: React.FC<{ id: number; className?: string }>;
}

export const ProductCard = ({
  id,
  title,
  price,
  image,
  description,
  isFavorited,
  AddToFavoritesButton,
  DeleteProductButton,
}: Props) => {
  return (
    <div className="p-4 rounded-lg hover:shadow-lg drop-shadow-2xl ease-in-out duration-300 cursor-pointer">
      <Image
        src={image || '/placehodler.webp'}
        alt={title}
        width={600}
        height={600}
        className="aspect-square object-cover rounded-lg"
      />
      <p className="max-h-[28px] overflow-hidden text-xl font-bold mt-2">{title}</p>
      <p className="max-h-[24px] overflow-hidden font-bold my-2">{price} $</p>
      <div className="flex justify-between items-center gap-4 h-[60px]">
        <p className="h-full overflow-hidden font-light text-sm text-gray-500 line-clamp-3">
          {description}
        </p>
        <div className="flex gap-4">
          <DeleteProductButton id={id} className="max-phone:h-12 min-phone:h-6" />
          <AddToFavoritesButton
            id={id}
            isFavorited={isFavorited}
            className="max-phone:h-12 min-phone:h-6"
          />
        </div>
      </div>
    </div>
  );
};
