import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './ProductItemSkeleton.module.scss';
import { VStack } from '@/shared/ui/Stack';
import { FlexJustify } from '@/shared/ui/Stack/Flex';
import { Skeleton } from '@/shared/ui/Sceleton/Skeleton';
import { Card } from '@/shared/ui/Card';

interface ProductItemSkeletonProps {
   className?: string;
}

export const ProductItemSkeleton = memo((props: ProductItemSkeletonProps) => {
   const { className } = props;

   return (
      <Card id='sceleton' className={cls.card}>
         <VStack
            gap={25}
            justify={FlexJustify.BETWEEN}
            className={classNames(cls.ProductItemSkeleton, {}, [className])}
         >
            <Skeleton width={225} height={240} border='3%' />
            <Skeleton width={225} height={40} border='3%' />
            <Skeleton width={225} height={40} border='3%' />
            <Skeleton width={225} height={40} border='3%' />
         </VStack>
      </Card>
   );
});
