import React, { Dispatch, memo } from 'react';

import cls from './ProductsSelection.module.scss';
import { VStack } from '@/shared/ui/Stack';
import { FontColor, FontSize, FontWeight, Text } from '@/shared/ui/Text';
import { Product, Ingredients, IngredientsViews } from '@/entities/Product';
import { FlexAlign, FlexJustify } from '@/shared/ui/Stack/Flex';
import { ButtonsSelect } from '../ButtonsSelect/ButtonsSelect';
import {
   Button,
   ButtonBgColor,
   ButtonRadius,
   ButtonVariant,
} from '@/shared/ui/Button';

interface ProductsSelectionProps {
   modalInfo: Product;
   setSizePizza: Dispatch<React.SetStateAction<string>>;
   setViewDough: Dispatch<React.SetStateAction<string>>;
   viewDough: string;
   sizePizza: string;
}

export const ProductsSelection = memo((props: ProductsSelectionProps) => {
   const { modalInfo, setSizePizza, setViewDough, viewDough, sizePizza } =
      props;

   const bigPrice = modalInfo.price[2];
   const averagePrice = modalInfo.price[1];
   const smallPrice = modalInfo.price[0];
   const allIngredients = modalInfo.ingredients as IngredientsViews;

   let ingredients: Ingredients;
   let price: number;
   if (modalInfo.type === 'pizzas') {
      switch (sizePizza) {
         case 'big':
            ingredients = allIngredients.big;
            price = bigPrice;
            break;
         case 'average':
            ingredients = allIngredients.average;
            price = averagePrice;
            break;
         case 'small':
            ingredients = allIngredients.small;
            price = smallPrice;
            break;
         default:
            ingredients = allIngredients.small;
            price = smallPrice;
      }
   } else {
      ingredients = modalInfo.ingredients as Ingredients;
      price = smallPrice;
   }

   const dataPizza =
      modalInfo.type === 'pizzas'
         ? `${ingredients.dia} см, ${viewDough} тесто,`
         : '';

   const dataProduct = modalInfo.ingredients
      ? `${dataPizza} ${ingredients.weight} г`
      : '';

   return (
      <VStack justify={FlexJustify.BETWEEN} className={cls.infoContainer}>
         <VStack align={FlexAlign.START} className={cls.infoContainer}>
            <Text
               className={cls.title}
               fontSize={FontSize.SIZE_20}
               fontWeight={FontWeight.TEXT_900}
            >
               {modalInfo.title}
            </Text>
            <Text fontSize={FontSize.SIZE_14} fontWeight={FontWeight.TEXT_500}>
               {dataProduct}
            </Text>
            <Text
               className={cls.description}
               fontSize={FontSize.SIZE_11}
               fontWeight={FontWeight.TEXT_500}
            >
               {modalInfo.description}
            </Text>
            {modalInfo.type === 'pizzas' && (
               <ButtonsSelect
                  setSizePizza={setSizePizza}
                  setViewDough={setViewDough}
                  sizePizza={sizePizza}
                  viewDough={viewDough}
               />
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
         >
            Добавить в корзину за {price}
         </Button>
      </VStack>
   );
});
