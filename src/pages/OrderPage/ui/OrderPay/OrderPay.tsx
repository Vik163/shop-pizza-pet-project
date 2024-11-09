import { memo, useCallback, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './OrderPay.module.scss';
import { HStack, VStack } from '@/shared/ui/Stack';
import {
   FontColor,
   FontSize,
   FontWeight,
   HeaderTagType,
   Text,
} from '@/shared/ui/Text';
import { FlexAlign } from '@/shared/ui/Stack/Flex';
import { Input, InputVariant } from '@/shared/ui/Input';
import cardIcon from '@/shared/assets/icons/card-pay.png';
import { Icon } from '@/shared/ui/Icon';
import { useResize } from '@/shared/lib/hooks/useResize';

interface OrderPayProps {
   className?: string;
}

export const OrderPay = memo((props: OrderPayProps) => {
   const { className } = props;
   const [valueRadio, setValueRadio] = useState('cash');
   const { isMobile } = useResize();

   const onRadio = useCallback((value: string) => {
      setValueRadio(value);
   }, []);

   return (
      <VStack
         align={FlexAlign.START}
         className={classNames(cls.OrderPay, {}, [className])}
      >
         <Text
            fontSize={FontSize.SIZE_26}
            fontColor={FontColor.TEXT_PINK}
            fontWeight={FontWeight.TEXT_700}
            className={cls.title}
            title={HeaderTagType.H_2}
         >
            Способы оплаты
         </Text>
         <Input
            type='radio'
            name='radio'
            id='card'
            value='card'
            classNameInputWithLabel={cls.radio}
            labelRight={
               <label htmlFor='card' className={cls.labelCard}>
                  <Icon src={cardIcon} className={cls.cardIcon} /> Картой на
                  сайте
               </label>
            }
            widthInput={19}
            heightInput={19}
            variant={InputVariant.INPUT_RADIO}
            onClickCheckbox={onRadio}
            checked={valueRadio === 'card'}
         />
         <Input
            type='radio'
            name='radio'
            id='cash'
            value='cash'
            classNameInputWithLabel={cls.radio}
            labelRight={
               <label htmlFor='cash' className={cls.labelCard}>
                  Наличными
               </label>
            }
            widthInput={19}
            heightInput={19}
            variant={InputVariant.INPUT_RADIO}
            onClickCheckbox={onRadio}
            checked={valueRadio === 'cash'}
         />
         <HStack gap={24} className={cls.priceContainer}>
            <Input
               type='number'
               name='sum'
               widthInput={116}
               labelLeft={
                  !isMobile ? (
                     <Text
                        fontSize={FontSize.SIZE_15}
                        fontColor={FontColor.TEXT_INPUT_EDIT}
                        fontWeight={FontWeight.TEXT_700}
                     >
                        С какой суммы подготовить сдачу?
                     </Text>
                  ) : (
                     ''
                  )
               }
               labelTop={
                  isMobile ? (
                     <Text
                        fontSize={FontSize.SIZE_13}
                        fontColor={FontColor.TEXT_INPUT_EDIT}
                        fontWeight={FontWeight.TEXT_700}
                        className={cls.labelTop}
                     >
                        С какой суммы подготовить сдачу?
                     </Text>
                  ) : (
                     ''
                  )
               }
               classNameInputWithLabel={cls.inputLabel}
               heightInput={46}
               withoutButtons
               buttonInput='Применить'
               placeholder='&#8381;'
               value='Отсутствует'
            />
            <Input
               type='checkbox'
               name='checkboxChange'
               id='without_change'
               classNameInputWithLabel={cls.checkboxChange}
               labelRight={
                  <label htmlFor='without_change' className={cls.label}>
                     Без сдачи
                  </label>
               }
               widthInput={19}
               heightInput={19}
               variant={InputVariant.INPUT_CHECKBOX}
               // onClickCheckbox={clickCheckbox}
               // checked={addAdvertisement}
            />
         </HStack>
      </VStack>
   );
});
