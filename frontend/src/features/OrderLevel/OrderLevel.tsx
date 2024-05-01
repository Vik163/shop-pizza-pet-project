import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './OrderLevel.module.scss';
import { HStack, VStack } from '@/shared/ui/Stack';
import { FlexJustify } from '@/shared/ui/Stack/Flex';
import { Text } from '@/shared/ui/Text';

interface OrderLevelProps {
   className?: string;
}

export const OrderLevel = memo((props: OrderLevelProps) => {
   const { className } = props;
   const active = true;

   return (
      <HStack
         justify={FlexJustify.BETWEEN}
         className={classNames(cls.OrderLevel, {}, [className])}
      >
         <VStack gap={5} className={cls.levelContainer}>
            <div
               className={classNames(
                  cls.level,
                  { [cls.levelActive]: active },
                  [],
               )}
            >
               1
            </div>
            <Text
               className={classNames(
                  cls.text,
                  { [cls.textActive]: active },
                  [],
               )}
            >
               Корзина
            </Text>
         </VStack>
         <VStack gap={5} className={cls.levelContainer}>
            <div
               className={classNames(
                  cls.level,
                  { [cls.levelActive]: false },
                  [],
               )}
            >
               2<Text className={cls.dotted}>-------------</Text>
            </div>
            <Text
               className={classNames(cls.text, { [cls.textActive]: false }, [])}
            >
               Оформление заказа
            </Text>
         </VStack>
         <VStack gap={5}>
            <div
               className={classNames(
                  cls.level,
                  { [cls.levelActive]: false },
                  [],
               )}
            >
               3<Text className={cls.dotted}>-------------</Text>
            </div>
            <Text
               className={classNames(cls.text, { [cls.textActive]: false }, [])}
            >
               Заказ принят
            </Text>
         </VStack>
      </HStack>
   );
});
