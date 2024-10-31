import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './NewProductsSkeleton.module.scss';
import { HStack, VStack } from '@/shared/ui/Stack';
import { FlexJustify } from '@/shared/ui/Stack/Flex';
import { Skeleton } from '@/shared/ui/Sceleton/Skeleton';
import { SizedCard } from '../../../../model/types/sizesCard';

interface NewProductsSkeletonProps {
   className?: string;
   elements: number;
   sizesCard?: SizedCard;
   isMobile?: boolean;
}

export const NewProductsSkeleton = memo((props: NewProductsSkeletonProps) => {
   const { className, elements, sizesCard, isMobile } = props;

   return (
      <HStack
         gap={sizesCard?.gap}
         className={classNames(cls.NewProductsSkeleton, {}, [className])}
      >
         {new Array(elements).fill(0).map((item, index) => (
            <HStack
               className={classNames(cls.CardSkeleton, {}, [className])}
               // eslint-disable-next-line react/no-array-index-key
               key={index}
               gap={sizesCard?.gap}
               justify={FlexJustify.CENTER}
            >
               <Skeleton
                  width={isMobile ? 56 : 70}
                  height={isMobile ? 56 : 70}
                  border='3%'
               />
               <VStack gap={isMobile ? 15 : 20}>
                  <Skeleton
                     width={110}
                     height={isMobile ? 15 : 25}
                     border='3%'
                  />
                  <Skeleton
                     width={110}
                     height={isMobile ? 15 : 25}
                     border='3%'
                  />
               </VStack>
            </HStack>
         ))}
      </HStack>
   );
});
