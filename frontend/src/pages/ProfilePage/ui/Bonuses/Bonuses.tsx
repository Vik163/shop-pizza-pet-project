import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Bonuses.module.scss';
import { HStack, VStack } from '@/shared/ui/Stack';
import {
   HeaderTagType,
   Text,
   TextAlign,
   FontColor,
   FontSize,
   FontWeight,
} from '@/shared/ui/Text';
import sale from '@/shared/assets/images/sale.png';
import { FlexAlign, FlexJustify } from '@/shared/ui/Stack/Flex';

interface BonusesProps {
   className?: string;
}

export const Bonuses = memo((props: BonusesProps) => {
   const { className } = props;

   return (
      <section className={cls.Bonuses}>
         <VStack
            className={cls.bonusesContainer}
            align={FlexAlign.START}
            gap={33}
         >
            <Text
               fontSize={FontSize.SIZE_32}
               fontWeight={FontWeight.TEXT_900}
               fontColor={FontColor.TEXT_YELLOW}
               title={HeaderTagType.H_3}
            >
               Мои бонусы
            </Text>
            <VStack className={cls.emptyCard} gap={32}>
               <img src={sale} />
               <Text
                  align={TextAlign.TEXT_CENTER}
                  fontSize={FontSize.SIZE_14}
                  fontWeight={FontWeight.TEXT_700}
                  fontColor={FontColor.TEXT_GREY_BLUE_DARK}
                  title={HeaderTagType.H_3}
               >
                  Бонусы появятся здесь после заказа
               </Text>
            </VStack>
            <Text
               className={cls.bonusesLink}
               fontSize={FontSize.SIZE_15}
               fontWeight={FontWeight.TEXT_700}
               fontColor={FontColor.TEXT_YELLOW}
            >
               Все наши акции
            </Text>
         </VStack>
      </section>
   );
});
