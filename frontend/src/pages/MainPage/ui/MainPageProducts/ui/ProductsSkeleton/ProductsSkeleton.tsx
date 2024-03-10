import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './ProductsSkeleton.module.scss';
import { Skeleton } from '@/shared/ui/Sceleton/Skeleton';
import { VStack } from '@/shared/ui/Stack';
import { FlexJustify } from '@/shared/ui/Stack/Flex';

interface ProductsSkeletonProps {
   className?: string;
   elements: number;
}

export const ProductsSkeleton = memo((props: ProductsSkeletonProps) => {
   const { className, elements } = props;

   return new Array(elements).fill(0).map((item, index) => (
      <VStack
         // eslint-disable-next-line react/no-array-index-key
         key={index}
         gap={30}
         justify={FlexJustify.BETWEEN}
         className={classNames(cls.ProductsSkeleton, {}, [className])}
      >
         <Skeleton width={225} height={240} border='3%' />
         <Skeleton width={225} border='3%' />
         <Skeleton width={225} border='3%' />
         <Skeleton width={225} border='3%' />
      </VStack>
   ));
});
