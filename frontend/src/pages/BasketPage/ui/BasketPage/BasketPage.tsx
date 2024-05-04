import { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './BasketPage.module.scss';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Icon } from '@/shared/ui/Icon';
import logo from '@/shared/assets/icons/shop_logo.png';
import { OrderLevel } from '@/features/OrderLevel';
import { FlexAlign, FlexJustify } from '@/shared/ui/Stack/Flex';
import { FontColor, FontSize, FontWeight, Text } from '@/shared/ui/Text';
import { BasketPageProducts } from '../BasketPageProducts/BasketPageProducts';
import { getBasketTotalPrice } from '@/entities/Basket';
import { AdditionToOrder } from '../AdditionToOrder/AdditionToOrder';
import { DynamicReducersLoader } from '@/shared/lib/components/DynamicReducersLoader';
import { basketPageReducer } from '../../model/slices/basketPageSlice';
import { fetchAdditionToOrder } from '../../model/services/fetchAdditionToOrder';
import { getAdditionToOrder } from '../../model/selectors/additionToOrderSelector';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';

interface BasketPageProps {
   className?: string;
}

const initialReducers = {
   basketPage: basketPageReducer,
};

export const BasketPage = memo((props: BasketPageProps) => {
   const { className } = props;
   const dispatch = useAppDispatch();
   const totalPrice = useSelector(getBasketTotalPrice);
   // const { word } = useChangeWord(basketProducts.length);
   const additionToOrder = useSelector(getAdditionToOrder);
   console.log('additionToOrder:', additionToOrder);

   useEffect(() => {
      dispatch(fetchAdditionToOrder());
   }, [dispatch]);

   return (
      <DynamicReducersLoader removeAfterUnmount reducers={initialReducers}>
         <VStack className={classNames(cls.BasketPage, {}, [className])}>
            <HStack max justify={FlexJustify.BETWEEN} className={cls.header}>
               <Icon src={logo} />
               <OrderLevel />
            </HStack>
            <VStack className={cls.main} align={FlexAlign.START}>
               <Text
                  fontSize={FontSize.SIZE_38}
                  fontColor={FontColor.TEXT_YELLOW}
                  fontWeight={FontWeight.TEXT_900}
                  className={cls.title}
               >
                  Корзина
               </Text>
               <BasketPageProducts />
               {additionToOrder && (
                  <AdditionToOrder additions={additionToOrder} />
               )}
            </VStack>
         </VStack>
      </DynamicReducersLoader>
   );
});
