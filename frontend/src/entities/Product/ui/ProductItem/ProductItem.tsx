import { memo, useState } from 'react';

import cls from './ProductItem.module.scss';

import { Card, CardRadius } from '@/shared/ui/Card';
import { Product } from '../../model/types/product';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import { HStack, VStack } from '@/shared/ui/Stack';
import { FontColor, FontSize, FontWeight, Text } from '@/shared/ui/Text';
import { FlexJustify } from '@/shared/ui/Stack/Flex';
import {
   Button,
   ButtonBgColor,
   ButtonRadius,
   ButtonVariant,
} from '@/shared/ui/Button';

interface ProductItemProps {
   card: Product;
   buttonText: string;
}

export const ProductItem = memo((props: ProductItemProps) => {
   const { card, buttonText } = props;
   const [isOpenPopup, setIsOpenPopup] = useState(false);

   const onModal = () => {
      setIsOpenPopup(true);
      // setTitlePopup('Вход на сайт');
   };

   // const closePopup = () => {
   //    setIsOpenPopup(false);
   //    // setTitlePopup('Вход на сайт');
   // };

   const mods: Mods = {
      [cls.new]: card.addInfo === 'Новинка',
   };

   return (
      <div>
         {/* {isOpenPopup && (
            // если нет то модалка не встраивается
            <Modal
               className={cls.phoneModal}
               isOpen={isOpenPopup}
               onClose={closePopup}
               title={card.title}
               lazy
            >
               <PhoneForm onClosePopup={closePopup} />
            </Modal>
         )} */}
         <Card
            key={card.title}
            className={cls.card}
            radius={CardRadius.RADIUS_14}
            onClick={onModal}
         >
            <VStack className={cls.container}>
               {card.addInfo && (
                  <div className={classNames(cls.addInfo, mods, [])}>
                     {card.addInfo}
                  </div>
               )}
               <img
                  className={cls.image}
                  src={card.imageAverage}
                  alt={card.title}
               />
               <Text
                  className={cls.title}
                  fontSize={FontSize.SIZE_20}
                  fontWeight={FontWeight.TEXT_700}
                  fontColor={FontColor.TEXT_TITLE_CARD}
                  max
               >
                  {card.title}
               </Text>
               <Text
                  className={cls.text}
                  fontSize={FontSize.SIZE_13}
                  fontWeight={FontWeight.TEXT_500}
                  fontColor={FontColor.TEXT_CARD}
                  max
               >
                  {card.description}
               </Text>
            </VStack>
            <HStack
               justify={FlexJustify.BETWEEN}
               className={cls.priceContainer}
               max
            >
               <Text
                  fontSize={FontSize.SIZE_20}
                  fontWeight={FontWeight.TEXT_700}
                  fontColor={FontColor.TEXT_PRIMARY}
               >
                  от {card.price[0]} &#8381;
               </Text>
               <Button
                  variant={ButtonVariant.FILLED}
                  bgColor={ButtonBgColor.YELLOW}
                  radius={ButtonRadius.RADIUS_8}
                  fontColor={FontColor.TEXT_BUTTON}
                  width={126}
                  height={36}
               >
                  {buttonText}
               </Button>
            </HStack>
         </Card>
      </div>
   );
});
