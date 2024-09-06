import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './NewProductsSkeleton.module.scss';
import { HStack, VStack } from '@/shared/ui/Stack';
import { FlexJustify } from '@/shared/ui/Stack/Flex';
import { Skeleton } from '@/shared/ui/Sceleton/Skeleton';

interface NewProductsSkeletonProps {
   className?: string;
   elements: number;
}

export const NewProductsSkeleton = memo((props: NewProductsSkeletonProps) => {
   const { className, elements } = props;

   return (
      <HStack
         gap={30}
         className={classNames(cls.NewProductsSkeleton, {}, [className])}
      >
         {new Array(elements).fill(0).map((item, index) => (
            <HStack
               className={classNames(cls.CardSkeleton, {}, [className])}
               // eslint-disable-next-line react/no-array-index-key
               key={index}
               gap={30}
               justify={FlexJustify.CENTER}
            >
               <Skeleton width={70} height={70} border='3%' />
               <VStack gap={20}>
                  <Skeleton width={110} height={25} border='3%' />
                  <Skeleton width={110} height={25} border='3%' />
               </VStack>
            </HStack>
         ))}
      </HStack>
   );
});
