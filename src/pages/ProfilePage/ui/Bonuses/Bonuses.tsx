import { memo } from 'react';

import cls from './Bonuses.module.scss';
import { VStack } from '@/shared/ui/Stack';
import {
   HeaderTagType,
   Text,
   TextAlign,
   FontColor,
   FontSize,
   FontWeight,
} from '@/shared/ui/Text';
import sale from '@/shared/assets/images/sale.png';
import { FlexAlign } from '@/shared/ui/Stack/Flex';
import { useResize } from '@/shared/lib/hooks/useResize';

interface BonusesProps {
   className?: string;
}

export const Bonuses = memo((props: BonusesProps) => {
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const { className } = props;
   const { isMobile } = useResize();

   return (
      <section className={cls.Bonuses}>
         <VStack
            className={cls.bonusesContainer}
            align={FlexAlign.START}
            gap={33}
         >
            <Text
               fontSize={isMobile ? FontSize.SIZE_30 : FontSize.SIZE_32}
               fontWeight={FontWeight.TEXT_900}
               fontColor={FontColor.TEXT_YELLOW}
               title={HeaderTagType.H_3}
            >
               Мои бонусы
            </Text>
            <VStack className={cls.emptyCard} gap={32}>
               <img src={sale} alt='распродажа' />
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
