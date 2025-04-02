import { Skeleton } from '@/shared/ui/skeleton';

export const ProductCardSkeleton = () => {
  return (
    <div className="cursor-pointer">
      <Skeleton className="aspect-square h-auto" />
      <Skeleton className=" h-[28px] mt-2" />
      <Skeleton className=" h-[24px] my-2" />
      <Skeleton className=" h-[60px]" />
    </div>
  );
};
