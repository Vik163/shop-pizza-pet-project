/* eslint-disable react/jsx-max-props-per-line */
import { memo, useState } from 'react';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';

import cls from './OrderProductsModal.module.scss';
import { Product } from '@/entities/Product';
import { HStack } from '@/shared/ui/Stack';
import { ProductsSelection } from '../ProductsSelection/ProductsSelection';

interface OrderProductsModalProps {
   className?: string;
   modalInfo: Product;
}

export const OrderProductsModal = memo((props: OrderProductsModalProps) => {
   const { className, modalInfo } = props;
   const [sizePizza, setSizePizza] = useState('small');
   const [viewDough, setViewDough] = useState('традиционное');

   console.log('modalInfo:', modalInfo);

   const imageMods: Mods = {
      [cls.imageBig]: sizePizza === 'big',
      [cls.imageAverage]: sizePizza === 'average',
      [cls.imageSmall]: sizePizza === 'small',
   };

   return (
      <HStack
         gap={23}
         className={classNames(cls.OrderProducts, {}, [className])}
      >
         <div className={cls.imageContainer}>
            {modalInfo.type === 'pizzas' && (
               <svg viewBox='0 0 500 500'>
                  <circle cx='250' cy='250' r='245' className={cls.bigBorder} />
                  <circle
                     cx='250'
                     cy='250'
                     r='200'
                     className={cls.averageBorder}
                  />
               </svg>
            )}
            <img
               className={classNames('', imageMods, [])}
               src={modalInfo.image}
               alt={modalInfo.title}
            />
         </div>
         <ProductsSelection
            setSizePizza={setSizePizza}
            modalInfo={modalInfo}
            setViewDough={setViewDough}
            viewDough={viewDough}
            sizePizza={sizePizza}
         />
      </HStack>
   );
});
