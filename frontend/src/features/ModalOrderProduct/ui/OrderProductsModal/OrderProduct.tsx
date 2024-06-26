import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';

import cls from './OrderProduct.module.scss';
import { Product } from '@/entities/Product';
import { HStack } from '@/shared/ui/Stack';
import { ProductsSelection } from '../ProductsSelection/ProductsSelection';
import { getSizePizza } from '../../../../entities/Basket/model/selectors/basketSelector';
import { DynamicReducersLoader } from '@/shared/lib/components/DynamicReducersLoader';
import { additivesReducer } from '@/entities/Additives';
import { BasketOneProduct } from '@/entities/Basket';
import { SizePizza } from '@/shared/const/product_const';

interface OrderProductProps {
   className?: string;
   productInfo: Product;
   onCloseModal: () => void;
   existingOrder?: BasketOneProduct;
}

const initialReducer = {
   additives: additivesReducer,
};

export const OrderProduct = memo((props: OrderProductProps) => {
   const { className, productInfo, onCloseModal, existingOrder } = props;
   const sizePizza = useSelector(getSizePizza);

   const imageMods: Mods = {
      [cls.imageBig]: sizePizza === SizePizza.BIG,
      [cls.imageAverage]: sizePizza === SizePizza.AVERAGE,
      [cls.imageSmall]: sizePizza === SizePizza.SMALL,
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
               existingOrder={existingOrder}
            />
         </HStack>
      </DynamicReducersLoader>
   );
});
