import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './selectAddressModal.module.scss';
import { VStack } from '@/shared/ui/Stack';
import { FontColor, FontSize, FontWeight, Text } from '@/shared/ui/Text';

interface SelectAddressModalProps {
   className?: string;
}

export const SelectAddressModal = memo((props: SelectAddressModalProps) => {
   const { className } = props;

   return (
      <VStack className={classNames(cls.SelectAddressModal, {}, [className])}>
         <Text
            fontSize={FontSize.SIZE_32}
            fontColor={FontColor.TEXT_YELLOW}
            fontWeight={FontWeight.TEXT_900}
         >
            Куда доставить?
         </Text>
      </VStack>
   );
});
