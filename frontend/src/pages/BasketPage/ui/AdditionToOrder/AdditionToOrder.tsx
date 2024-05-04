import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './AdditionToOrder.module.scss';
import { VStack } from '@/shared/ui/Stack';
import { FontColor, FontSize, FontWeight, Text } from '@/shared/ui/Text';
import { HorizontalScrolling } from '@/features/HorizontalScrolling';
import { Product } from '@/entities/Product';
import { FlexAlign } from '@/shared/ui/Stack/Flex';

interface AdditionToOrderProps {
   className?: string;
   additions: Product[];
}

export const AdditionToOrder = memo((props: AdditionToOrderProps) => {
   const { className, additions } = props;

   return (
      <VStack
         align={FlexAlign.START}
         className={classNames(cls.AddToOrder, {}, [className])}
      >
         <Text
            fontSize={FontSize.SIZE_24}
            fontColor={FontColor.TEXT_YELLOW}
            fontWeight={FontWeight.TEXT_700}
            className={cls.titleAdd}
         >
            Добавить к заказу?
         </Text>
         {additions && (
            <HorizontalScrolling
               elements={additions}
               widthBlock={780}
               heightBlock={108}
               widthElement={255}
               heightElement={99}
               gap={15}
               visibleElements={3}
            />
         )}
      </VStack>
   );
});
