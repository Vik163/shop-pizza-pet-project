/* eslint-disable react/jsx-max-props-per-line */
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';

import cls from './OrderProductsModal.module.scss';
import { Product } from '@/entities/Product';
import { HStack } from '@/shared/ui/Stack';
import { ProductsSelection } from '../ProductsSelection/ProductsSelection';
import { getSizePizza } from '../../../../entities/Basket/model/selectors/basketSelector';
import { DynamicReducersLoader } from '@/shared/lib/components/DynamicReducersLoader';
import { orderReducer } from '../../model/slices/orderSlice';
import { additivesReducer } from '@/entities/Additives';

interface OrderProductsModalProps {
   className?: string;
   productInfo: Product;
   onCloseModal: () => void;
}

const initialReducer = {
   order: orderReducer,
   additives: additivesReducer,
};

export const OrderProductsModal = memo((props: OrderProductsModalProps) => {
   const { className, productInfo, onCloseModal } = props;
   const sizePizza = useSelector(getSizePizza);

   const imageMods: Mods = {
      [cls.imageBig]: sizePizza === 'большая',
      [cls.imageAverage]: sizePizza === 'средняя',
      [cls.imageSmall]: sizePizza === 'маленькая',
   };

   return (
      <DynamicReducersLoader removeAfterUnmount reducers={initialReducer}>
         <HStack
            gap={23}
            className={classNames(cls.OrderProducts, {}, [className])}
         >
            <div className={cls.imageContainer}>
               {productInfo.type === 'pizzas' && (
                  <svg viewBox='0 0 500 500'>
                     <circle
                        cx='250'
                        cy='250'
                        r='245'
                        className={cls.bigBorder}
                     />
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
                  src={productInfo.image}
                  alt={productInfo.title}
               />
            </div>
            <ProductsSelection
               onCloseModal={onCloseModal}
               productInfo={productInfo}
            />
         </HStack>
      </DynamicReducersLoader>
   );
});
