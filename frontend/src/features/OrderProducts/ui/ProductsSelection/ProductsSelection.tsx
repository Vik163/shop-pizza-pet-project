import React, { memo } from 'react';

import { useSelector } from 'react-redux';
import cls from './ProductsSelection.module.scss';
import { VStack } from '@/shared/ui/Stack';
import { FontColor, FontSize, FontWeight, Text } from '@/shared/ui/Text';
import { Product } from '@/entities/Product';
import { FlexAlign, FlexJustify } from '@/shared/ui/Stack/Flex';
import { ButtonsSelect } from '../ButtonsSelect/ButtonsSelect';
import {
   Button,
   ButtonBgColor,
   ButtonRadius,
   ButtonVariant,
} from '@/shared/ui/Button';
import { AdditivesAsync as Additives } from '../../../../entities/Additives/ui/Additives/Additives.async';
import { useIngredients } from '../../lib/hooks/useIngredients';
import { getOrderAdditives } from '../../../../entities/Additives/model/selectors/additivesSelector';
import { useCountPrice } from '../../lib/hooks/useCountPrice';
import {
   getDoughView,
   getSizePizza,
} from '../../../../entities/Basket/model/selectors/basketSelector';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { fetchAddBasket } from '../../../../entities/Basket/model/services/fetchAddBasket';
import { BasketOneProduct } from '@/entities/Basket';

interface ProductsSelectionProps {
   productInfo: Product;
   onCloseModal: () => void;
}

export const ProductsSelection = memo((props: ProductsSelectionProps) => {
   const { productInfo, onCloseModal } = props;
   const dispatch = useAppDispatch();
   const viewDough = useSelector(getDoughView);
   const sizePizza = useSelector(getSizePizza);
   const ingredients = useIngredients({ productInfo, sizePizza });
   const orderAdditives = useSelector(getOrderAdditives);
   const orderAdditivesTitle = orderAdditives?.orderAdditivesTitle;
   const additivesPrice = orderAdditives?.price;
   const price = useCountPrice({ productInfo, sizePizza, additivesPrice });

   const dataPizza =
      productInfo.type === 'pizzas'
         ? `${ingredients.dia} см, ${viewDough} тесто,`
         : '';

   const dataProduct = productInfo.ingredients
      ? `${dataPizza} ${ingredients.weight} г`
      : '';

   const onSubmit = () => {
      const order: BasketOneProduct = {
         product: productInfo.title,
         sizePizza,
         dough: viewDough,
         additives: orderAdditivesTitle,
         price,
      };

      dispatch(fetchAddBasket(order)).then((data) => {
         if (data.payload) onCloseModal();
      });
   };

   return (
      <VStack justify={FlexJustify.BETWEEN} className={cls.infoContainer}>
         <VStack align={FlexAlign.START} className={cls.infoContainer}>
            <Text
               className={cls.title}
               fontSize={FontSize.SIZE_20}
               fontWeight={FontWeight.TEXT_900}
            >
               {productInfo.title}
            </Text>
            <Text fontSize={FontSize.SIZE_14} fontWeight={FontWeight.TEXT_500}>
               {dataProduct}
            </Text>
            <Text
               className={cls.description}
               fontSize={FontSize.SIZE_11}
               fontWeight={FontWeight.TEXT_500}
            >
               {productInfo.description}
            </Text>
            {productInfo.type === 'pizzas' && (
               <div>
                  <ButtonsSelect />
                  <Additives />
               </div>
            )}
         </VStack>
         <Button
            width={330}
            height={60}
            variant={ButtonVariant.FILLED}
            radius={ButtonRadius.RADIUS_8}
            bgColor={ButtonBgColor.YELLOW}
            fontSize={FontSize.SIZE_15}
            fontWeight={FontWeight.TEXT_900}
            fontColor={FontColor.TEXT_BUTTON}
            onClick={onSubmit}
         >
            Добавить в корзину за {price}
         </Button>
      </VStack>
   );
});
