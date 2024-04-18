import React, { Dispatch, memo } from 'react';

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
import { AdditivesAsync as Additives } from '../Additives/Additives.async';
import { useIngredients } from '../../lib/hooks/useIngredients';
import { getOrderAdditives } from '../../model/selectors/additivesSelector';
import { useCountPrice } from '../../lib/hooks/useCountPrice';

interface ProductsSelectionProps {
   productInfo: Product;
   setSizePizza: Dispatch<React.SetStateAction<string>>;
   setViewDough: Dispatch<React.SetStateAction<string>>;
   viewDough: string;
   sizePizza: string;
}

export const ProductsSelection = memo((props: ProductsSelectionProps) => {
   const { productInfo, setSizePizza, setViewDough, viewDough, sizePizza } =
      props;
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
                  <ButtonsSelect
                     setSizePizza={setSizePizza}
                     setViewDough={setViewDough}
                     sizePizza={sizePizza}
                     viewDough={viewDough}
                  />
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
         >
            Добавить в корзину за {price}
         </Button>
      </VStack>
   );
});
