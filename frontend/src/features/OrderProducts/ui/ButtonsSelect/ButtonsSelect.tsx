import React, { memo } from 'react';

import { useSelector } from 'react-redux';
import cls from './ButtonsSelect.module.scss';
import { Button } from '@/shared/ui/Button';
import { HStack } from '@/shared/ui/Stack';
import { FlexWrap } from '@/shared/ui/Stack/Flex';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { orderActions } from '../../model/slices/orderSlice';
import {
   getDoughView,
   getSizePizza,
} from '../../../../entities/Basket/model/selectors/basketSelector';
import { DoughPizza, SizePizza } from '@/entities/Basket';

export const ButtonsSelect = memo(() => {
   const dispatch = useAppDispatch();
   const sizePizza = useSelector(getSizePizza);
   const viewDough = useSelector(getDoughView);

   const clickSizePizza = (size: SizePizza) => {
      dispatch(orderActions.setSizePizza(size));
   };

   const clickViewDough = (dough: DoughPizza) => {
      dispatch(orderActions.setViewDough(dough));
   };

   return (
      <HStack gap={10} wrap={FlexWrap.WPAP} className={cls.buttonsContainer}>
         <Button
            onClick={() => clickSizePizza('small')}
            className={classNames(
               cls.buttonSmall,
               { [cls.buttonActive]: sizePizza === 'small' },
               [],
            )}
         >
            Маленькая
         </Button>
         <Button
            onClick={() => clickSizePizza('average')}
            className={classNames(
               cls.buttonSmall,
               { [cls.buttonActive]: sizePizza === 'average' },
               [],
            )}
         >
            Средняя
         </Button>
         <Button
            onClick={() => clickSizePizza('big')}
            className={classNames(
               cls.buttonSmall,
               { [cls.buttonActive]: sizePizza === 'big' },
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
