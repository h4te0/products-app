import { Container } from '@/shared/ui/container';
import { Skeleton } from '@/shared/ui/skeleton';

export const ProductPageSkeleton = () => {
  return (
    <Container classname="mt-4">
      <Skeleton className="h-9" />
      <Skeleton className="h-8 my-4" />
      <div className="flex gap-10 max-tablet:flex-col">
        <Skeleton className="w-full max-tablet:h-auto h-[600px] aspect-square" />
        <Skeleton className="h-[300px] w-full" />
      </div>
    </Container>
  );
};
