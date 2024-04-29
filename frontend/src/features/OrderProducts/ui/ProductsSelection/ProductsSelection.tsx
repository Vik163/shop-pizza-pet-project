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
import { Additives, getOrderAdditives } from '@/entities/Additives';
import { useIngredients } from '../../lib/hooks/useIngredients';
import { useCountPrice } from '../../lib/hooks/useCountPrice';
import {
   getBasketProducts,
   getDoughView,
   getSizePizza,
   fetchAddBasket,
   BasketOneProduct,
} from '@/entities/Basket';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';

interface ProductsSelectionProps {
   productInfo: Product;
   onCloseModal: () => void;
   existingOrder?: BasketOneProduct;
}

export const ProductsSelection = memo((props: ProductsSelectionProps) => {
   const { productInfo, onCloseModal, existingOrder } = props;
   const dispatch = useAppDispatch();
   const viewDough = useSelector(getDoughView);
   const sizePizza = useSelector(getSizePizza);
   const ingredients = useIngredients({ productInfo, sizePizza });
   const orderAdditives = useSelector(getOrderAdditives);
   const selectedProducts = useSelector(getBasketProducts);
   const orderAdditivesTitle = orderAdditives?.orderAdditivesTitle;
   const additivesPrice = orderAdditives?.price;
   const totalPrice = useCountPrice({ productInfo, sizePizza, additivesPrice });

   const dataPizza =
      productInfo.type === 'pizzas'
         ? `${ingredients.dia} см, ${viewDough} тесто,`
         : '';

   const dataProduct = productInfo.ingredients
      ? `${dataPizza} ${ingredients.weight} г`
      : '';

   const onSubmit = () => {
      let order: BasketOneProduct;

      if (productInfo.type === 'pizzas') {
         order = {
            product: productInfo.title,
            image: productInfo.imageSmall,
            sizePizza,
            dia: ingredients.dia,
            dough: viewDough,
            additives: orderAdditivesTitle,
            price: totalPrice,
         };
      } else {
         order = {
            product: productInfo.title,
            image: productInfo.imageSmall,
            price: totalPrice,
         };
      }

      dispatch(fetchAddBasket(order)).then((data) => {
         if (data.payload) onCloseModal();
      });
   };

   return (
      <VStack gap={20} justify={FlexJustify.BETWEEN} className={cls.container}>
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
                  <ButtonsSelect existingOrder={existingOrder} />
                  <Additives
                     existingOrderAdditives={existingOrder?.additives}
                  />
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
            Добавить в корзину за {totalPrice} &#8381;
         </Button>
      </VStack>
   );
});
