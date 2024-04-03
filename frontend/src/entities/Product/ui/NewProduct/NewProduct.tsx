import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './NewProduct.module.scss';
import { VStack } from '@/shared/ui/Stack';
import { Product } from '../..';
import { Text, FontColor, FontSize, FontWeight } from '@/shared/ui/Text';
import { FlexAlign, FlexJustify } from '@/shared/ui/Stack/Flex';
import { Card } from '@/shared/ui/Card';

interface NewProductProps {
   className?: string;
   card: Product;
}

export const NewProduct = memo((props: NewProductProps) => {
   const { className, card } = props;

   return (
      <Card horizontal className={classNames(cls.NewProduct, {}, [className])}>
         <div
            className={cls.image}
            style={{
               backgroundImage: `url(${card.imageSmall})`,
            }}
         />
         <VStack
            className={classNames(cls.cardInfo)}
            align={FlexAlign.START}
            justify={FlexJustify.CENTER}
         >
            <Text
               className={cls.text}
               fontSize={FontSize.SIZE_18}
               fontWeight={FontWeight.TEXT_700}
               fontColor={FontColor.TEXT_PRIMARY}
            >
               {card.title}
            </Text>
            <Text
               className={cls.text}
               fontSize={FontSize.SIZE_16}
               fontWeight={FontWeight.TEXT_700}
               fontColor={FontColor.TEXT_YELLOW}
            >
               от {card.price[0]} &#8381;
            </Text>
         </VStack>
      </Card>
   );
});
