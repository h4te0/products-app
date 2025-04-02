import { useRouter } from 'next/navigation';
import { Trash } from 'lucide-react';

import { useProductsStore } from '@/entities/product';
import { cn } from '@/shared/lib/tailwind-merge';

interface Props {
  className?: string;
  id: number;
}

export const DeleteProductButton = ({ className, id }: Props) => {
  const deleteProduct = useProductsStore((state) => state.deleteProduct);

  const { push } = useRouter();

  const deleteProductHandle = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    deleteProduct(id);
    push('/', { scroll: false });
  };

  return (
    <div
      className={cn(className, 'aspect-square hover:scale-[1.05] cursor-pointer')}
      onClick={deleteProductHandle}>
      <Trash
        color="#ff6467"
        strokeWidth={1.5}
        className="w-full h-full hover:opacity-80 ease-in-out duration-200"
      />
    </div>
  );
};
