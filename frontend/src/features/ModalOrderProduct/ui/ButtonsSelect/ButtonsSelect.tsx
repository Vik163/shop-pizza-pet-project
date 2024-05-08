import React, { memo, useEffect } from 'react';

import { useSelector } from 'react-redux';
import cls from './ButtonsSelect.module.scss';
import { Button } from '@/shared/ui/Button';
import { HStack } from '@/shared/ui/Stack';
import { FlexWrap } from '@/shared/ui/Stack/Flex';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import {
   getDoughView,
   getSizePizza,
} from '../../../../entities/Basket/model/selectors/basketSelector';
import {
   BasketOneProduct,
   TDoughPizza,
   TSizePizza,
   basketActions,
} from '@/entities/Basket';
import { SizePizza, ViewDough } from '@/shared/const/product_const';

interface ButtonsSelectProps {
   existingOrder?: BasketOneProduct;
}

export const ButtonsSelect = memo((props: ButtonsSelectProps) => {
   const { existingOrder } = props;
   const dispatch = useAppDispatch();
   const sizePizza = useSelector(getSizePizza);
   const viewDough = useSelector(getDoughView);

   useEffect(() => {
      if (existingOrder?.sizePizza)
         dispatch(basketActions.setSizePizza(existingOrder.sizePizza));
      if (existingOrder?.dough)
         dispatch(basketActions.setViewDough(existingOrder.dough));
   }, []);

   const clickSizePizza = (size: TSizePizza) => {
      dispatch(basketActions.setSizePizza(size));
   };

   const clickViewDough = (dough: TDoughPizza) => {
      dispatch(basketActions.setViewDough(dough));
   };

   return (
      <HStack gap={10} wrap={FlexWrap.WPAP} className={cls.buttonsContainer}>
         <Button
            onClick={() => clickSizePizza(SizePizza.SMALL)}
            className={classNames(
               cls.buttonSmall,
               {
                  [cls.buttonActive]: sizePizza === SizePizza.SMALL,
               },
               [],
            )}
         >
            Маленькая
         </Button>
         <Button
            onClick={() => clickSizePizza(SizePizza.AVERAGE)}
            className={classNames(
               cls.buttonSmall,
               {
                  [cls.buttonActive]: sizePizza === SizePizza.AVERAGE,
               },
               [],
            )}
         >
            Средняя
         </Button>
         <Button
            onClick={() => clickSizePizza(SizePizza.BIG)}
            className={classNames(
               cls.buttonSmall,
               {
                  [cls.buttonActive]: sizePizza === SizePizza.BIG,
               },
               [],
            )}
         >
            Большая
         </Button>
         <Button
            onClick={() => clickViewDough(ViewDough.TRADITIONAL)}
            className={classNames(
               cls.buttonBig,
               { [cls.buttonActive]: viewDough === ViewDough.TRADITIONAL },
               [],
            )}
         >
            Традиционное
         </Button>
         <Button
            onClick={() => clickViewDough(ViewDough.THIN)}
            className={classNames(
               cls.buttonBig,
               { [cls.buttonActive]: viewDough === ViewDough.THIN },
               [],
            )}
         >
            Тонкое
         </Button>
      </HStack>
   );
});
