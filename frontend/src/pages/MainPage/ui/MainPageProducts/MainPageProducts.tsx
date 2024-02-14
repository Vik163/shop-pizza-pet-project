import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './MainPageProducts.module.scss';

import { type Products, type TypeProducts } from './model/types/mainPageProducts';
import { VStack } from '@/shared/ui/Stack';
import { ViewProducts } from '../ViewProducts/ui/ViewProducts';

interface MainPageProductsProps {
   className?: string;
   cards: Products;
}

export const MainPageProducts = memo((props: MainPageProductsProps) => {
   const { className, cards } = props;

   return (
      <VStack className={classNames(cls.MainPageProducts, {}, [className])}>
         {cards.map((cardsType: TypeProducts, i) => {
            return Object.entries(cardsType).map(([key, value]) => (
               <ViewProducts key={key} view={key} cardsType={value} />
            ));
         })}
      </VStack>
   );
});
