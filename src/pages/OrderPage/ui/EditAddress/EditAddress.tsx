import { memo, useState } from 'react';

import { useSelector } from 'react-redux';
import cls from './EditAddress.module.scss';

import { FontColor, FontSize, FontWeight, Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';
import { FlexAlign, FlexJustify } from '@/shared/ui/Stack/Flex';
import { Modal } from '@/shared/ui/Modal';
import { SelectAddressModal } from '@/features/SelectAddressModal';
import { TypeDelivery, getDeliveryInfo, orderActions } from '@/entities/Order';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { HStack, VStack } from '@/shared/ui/Stack';
import { useResize } from '@/shared/lib/hooks/useResize';

export const EditAddress = memo(() => {
   const dispatch = useAppDispatch();
   const [openModal, setOpenModal] = useState(false);
   const deliveryInfo = useSelector(getDeliveryInfo);
   const { isMobile } = useResize();

   const title =
      deliveryInfo?.typeDelivery === 'Доставка' ? 'Дом' : 'Адрес пиццерии';
   const buttonSelect =
      title === 'Адрес пиццерии' ? 'Выбрать адрес' : 'Выбрать самовывоз';

   const onOpenModal = (type: TypeDelivery) => {
      dispatch(orderActions.setTypeDelivery(type));
      setOpenModal(true);
   };

   const closeModal = () => {
      const addressEmpty = {
         city: '',
         street: '',
         house: '',
         apartment: '',
         entrance: '',
         floor: '',
         comment: '',
      };
      dispatch(orderActions.setAddress(addressEmpty));

      // Чтобы при закрытии модалки без изменений не менялся тип доставки
      if (deliveryInfo) {
         dispatch(orderActions.setTypeDelivery(deliveryInfo.typeDelivery));
      }
      setOpenModal(false);
   };

   return (
      <HStack
         max
         className={cls.EditAddress}
         align={FlexAlign.START}
         justify={FlexJustify.BETWEEN}
      >
         <Text className={cls.title}>Адрес доставки</Text>

         <HStack
            max
            className={cls.addressContainer}
            justify={FlexJustify.BETWEEN}
            align={FlexAlign.START}
         >
            <VStack
               gap={15}
               className={cls.address}
               justify={FlexJustify.START}
               align={FlexAlign.START}
            >
               <Text
                  fontSize={isMobile ? FontSize.SIZE_13 : FontSize.SIZE_17}
                  fontColor={FontColor.TEXT_INPUT_EDIT}
               >
                  {title}
               </Text>
               {deliveryInfo?.textAddress && (
                  <Text
                     fontSize={isMobile ? FontSize.SIZE_13 : FontSize.SIZE_17}
                     fontColor={FontColor.TEXT_INPUT_EDIT}
                  >
                     {deliveryInfo?.textAddress}
                  </Text>
               )}
            </VStack>
            <VStack
               gap={15}
               className={cls.buttonsContainer}
               align={FlexAlign.END}
               justify={FlexJustify.BETWEEN}
            >
               <Button
                  fontColor={FontColor.TEXT_GREY_BLUE_DARK}
                  fontSize={isMobile ? FontSize.SIZE_13 : FontSize.SIZE_15}
                  fontWeight={FontWeight.TEXT_700}
                  onClick={() =>
                     onOpenModal(
                        title === 'Адрес пиццерии' ? 'Самовывоз' : 'Доставка',
                     )
                  }
               >
                  Изменить
               </Button>
               <Button
                  fontColor={FontColor.TEXT_GREY_BLUE_DARK}
                  fontSize={isMobile ? FontSize.SIZE_13 : FontSize.SIZE_15}
                  fontWeight={FontWeight.TEXT_700}
                  onClick={() =>
                     onOpenModal(
                        title === 'Адрес пиццерии' ? 'Доставка' : 'Самовывоз',
                     )
                  }
               >
                  {buttonSelect}
               </Button>
            </VStack>
         </HStack>

         {openModal && (
            <Modal
               buttonCloseHeight={isMobile ? 25 : 40}
               buttonCloseRight={isMobile ? 20 : 35}
               buttonCloseTop={isMobile ? 20 : 35}
               buttonCloseWidth={isMobile ? 25 : 40}
               isOpen={openModal}
               onClose={closeModal}
               zIndex={isMobile ? 15 : 5}
            >
               <SelectAddressModal closeModal={closeModal} />
            </Modal>
         )}
      </HStack>
   );
});
