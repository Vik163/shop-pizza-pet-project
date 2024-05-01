import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './BasketPage.module.scss';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Icon } from '@/shared/ui/Icon';
import logo from '@/shared/assets/icons/shop_logo.png';
import { OrderLevel } from '@/features/OrderLevel';
import { FlexAlign, FlexJustify } from '@/shared/ui/Stack/Flex';
import { FontColor, FontSize, FontWeight, Text } from '@/shared/ui/Text';

interface BasketPageProps {
   className?: string;
}

export const BasketPage = memo((props: BasketPageProps) => {
   const { className } = props;

   return (
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
            >
               Корзина
            </Text>
         </VStack>
      </VStack>
   );
});
