import { memo } from 'react';

import { Card } from '@/shared/ui/Card';
import { Product } from '../../model/types/product';
import { classNames } from '@/shared/lib/classNames/classNames';

interface ProductItemProps {
   className?: string;
   card: Product;
   buttonText: string;
}

export const ProductItem = memo((props: ProductItemProps) => {
   const { className, card, buttonText } = props;

   return (
      <Card
         key={card.title}
         className={classNames('', {}, [className])}
         title={card.title}
         price={card.price[0]}
         structure={card.description}
         buttonText={buttonText}
         image={card.imageAverage}
         addInfo={card.addInfo}
      />
   );
});
