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
   DoughPizza,
   SizePizza,
   basketActions,
} from '@/entities/Basket';

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

   const clickSizePizza = (size: SizePizza) => {
      dispatch(basketActions.setSizePizza(size));
   };

   const clickViewDough = (dough: DoughPizza) => {
      dispatch(basketActions.setViewDough(dough));
   };

   return (
      <HStack gap={10} wrap={FlexWrap.WPAP} className={cls.buttonsContainer}>
         <Button
            onClick={() => clickSizePizza('маленькая')}
            className={classNames(
               cls.buttonSmall,
               {
                  [cls.buttonActive]: sizePizza === 'маленькая',
               },
               [],
            )}
         >
            Маленькая
         </Button>
         <Button
            onClick={() => clickSizePizza('средняя')}
            className={classNames(
               cls.buttonSmall,
               {
                  [cls.buttonActive]: sizePizza === 'средняя',
               },
               [],
            )}
         >
            Средняя
         </Button>
         <Button
            onClick={() => clickSizePizza('большая')}
            className={classNames(
               cls.buttonSmall,
               {
                  [cls.buttonActive]: sizePizza === 'большая',
               },
               [],
            )}
         >
            Большая
         </Button>
         <Button
            onClick={() => clickViewDough('традиционное')}
            className={classNames(
               cls.buttonBig,
               { [cls.buttonActive]: viewDough === 'традиционное' },
               [],
            )}
         >
            Традиционное
         </Button>
         <Button
            onClick={() => clickViewDough('тонкое')}
            className={classNames(
               cls.buttonBig,
               { [cls.buttonActive]: viewDough === 'тонкое' },
               [],
            )}
         >
            Тонкое
         </Button>
      </HStack>
   );
});
