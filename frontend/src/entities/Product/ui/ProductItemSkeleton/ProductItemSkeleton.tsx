import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './ProductItemSkeleton.module.scss';
import { VStack } from '@/shared/ui/Stack';
import { FlexJustify } from '@/shared/ui/Stack/Flex';
import { Skeleton } from '@/shared/ui/Sceleton/Skeleton';

interface ProductItemSkeletonProps {
   className?: string;
}

export const ProductItemSkeleton = memo((props: ProductItemSkeletonProps) => {
   const { className } = props;

   return (
      <VStack
         gap={30}
         justify={FlexJustify.BETWEEN}
         className={classNames(cls.ProductItemSkeleton, {}, [className])}
      >
         <Skeleton width={225} height={240} border='3%' />
         <Skeleton width={225} border='3%' />
         <Skeleton width={225} border='3%' />
         <Skeleton width={225} border='3%' />
      </VStack>
   );
});
