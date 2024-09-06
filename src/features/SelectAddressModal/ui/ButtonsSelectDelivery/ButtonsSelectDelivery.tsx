import { memo } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './ButtonsSelectDelivery.module.scss';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { orderActions, getTypeDelivery } from '@/entities/Order';
import { HStack } from '@/shared/ui/Stack';
import { FlexWrap } from '@/shared/ui/Stack/Flex';
import { Button } from '@/shared/ui/Button';

type TTypeDelivery = 'Доставка' | 'Самовывоз';

interface ButtonsSelectDeliveryProps {
   clickDelivery?: () => void;
}

export const ButtonsSelectDelivery = memo(
   (props: ButtonsSelectDeliveryProps) => {
      const { clickDelivery } = props;
      const dispatch = useAppDispatch();
      const typeDelivery = useSelector(getTypeDelivery);

      const clickTypeDelivery = (type: TTypeDelivery) => {
         dispatch(orderActions.setTypeDelivery(type));
         if (clickDelivery) clickDelivery();
      };

      return (
         <HStack gap={15} wrap={FlexWrap.WPAP} className={cls.buttonsContainer}>
            <Button
               onClick={() => clickTypeDelivery('Доставка')}
               className={classNames(
                  cls.button,
                  {
                     [cls.buttonActive]: typeDelivery === 'Доставка',
                  },
                  [],
               )}
            >
               Доставка
            </Button>
            <Button
               onClick={() => clickTypeDelivery('Самовывоз')}
               className={classNames(
                  cls.button,
                  {
                     [cls.buttonActive]: typeDelivery === 'Самовывоз',
                  },
                  [],
               )}
            >
               Самовывоз
            </Button>
         </HStack>
      );
   },
);
