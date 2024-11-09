import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './ProductItemSkeleton.module.scss';
import { HStack, VStack } from '@/shared/ui/Stack';
import { FlexJustify } from '@/shared/ui/Stack/Flex';
import { Skeleton } from '@/shared/ui/Sceleton/Skeleton';
import { Card } from '@/shared/ui/Card';
import { useResize } from '@/shared/lib/hooks/useResize';

interface ProductItemSkeletonProps {
   className?: string;
}

export const ProductItemSkeleton = memo((props: ProductItemSkeletonProps) => {
   const { className } = props;
   const { isMobile } = useResize();

   return (
      <Card id='sceleton' className={cls.card}>
         {isMobile ? (
            <VStack gap={15}>
               <HStack
                  gap={15}
                  justify={FlexJustify.BETWEEN}
                  className={classNames(cls.ProductItemSkeleton, {}, [
                     className,
                  ])}
               >
                  <Skeleton width={70} height={70} border='50%' />
                  <VStack gap={12}>
                     <Skeleton width={180} height={25} border='3%' />
                     <Skeleton width={180} height={35} border='3%' />
                  </VStack>
               </HStack>
               <Skeleton width={270} height={30} border='3%' />
            </VStack>
         ) : (
            <VStack
               gap={25}
               justify={FlexJustify.BETWEEN}
               className={classNames(cls.ProductItemSkeleton, {}, [className])}
            >
               <Skeleton width={225} height={225} border='50%' />
               <Skeleton width={225} height={40} border='3%' />
               <Skeleton width={225} height={53} border='3%' />
               <Skeleton width={225} height={40} border='3%' />
            </VStack>
         )}
      </Card>
   );
});
