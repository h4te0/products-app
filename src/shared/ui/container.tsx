import { PropsWithChildren, RefObject } from 'react';

import { cn } from '@/shared/lib/tailwind-merge';

interface Props extends PropsWithChildren {
  classname?: string;
  ref?: RefObject<HTMLDivElement>;
}

export const Container = ({ classname, ref, children }: Props) => {
  return (
    <div
      ref={ref}
      className={cn(
        'mx-auto max-w-[1232px] max-laptop:max-w-[calc(100vw-32px)] max-phone:max-w-[calc(100vw-24px)]',
        classname,
      )}>
      {children}
    </div>
  );
};
