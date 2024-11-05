import {
   Ref,
   forwardRef,
   memo,
   useCallback,
   useImperativeHandle,
   useState,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './ModalOrderProduct.module.scss';
import { Product } from '@/entities/Product';
import { BasketOneProduct, basketActions } from '@/entities/Basket';
import { Modal } from '@/shared/ui/Modal';
import { OrderProduct } from '../OrderProductsModal/OrderProduct';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { SizePizza, ViewDough } from '@/shared/const/product_const';
import { modalDelay } from '@/shared/const/modal_delay';
import { useResize } from '@/shared/lib/hooks/useResize';

interface ModalOrderProductProps {
   onCloseModal?: () => void;
}

export interface RefTypeModal {
   openModal: (cardProduct?: Product, basket?: BasketOneProduct) => void;
}

// выбрал пробросить ref (функция открытия модалки с пропсом карточки)
export const ModalOrderProduct = forwardRef(
   (props: ModalOrderProductProps, ref: Ref<RefTypeModal>) => {
      const { onCloseModal } = props;
      const dispatch = useAppDispatch();
      const [isClosing, setIsClosing] = useState(false);
      const [productInfo, setProductInfo] = useState<Product>();
      const [isOpenModal, setIsOpenModal] = useState(false);
      const [existingOrder, setExistingOrder] = useState<BasketOneProduct>();
      const { isMobile } = useResize();

      const handleAnimate = (bool: boolean) => {
         setIsClosing(bool);
      };

      const openModal = useCallback(
         (cardProduct?: Product, basket?: BasketOneProduct) => {
            if (basket && basket.product) {
               setExistingOrder(basket);
               setProductInfo(basket.product);
               setIsOpenModal(true);
            } else {
               setProductInfo(cardProduct);
               setIsOpenModal(true);
            }
         },
         [],
      );

      const onClose = useCallback(() => {
         setProductInfo(undefined);

         setIsOpenModal(false);
         // сброс кнопок выбора
         dispatch(basketActions.setSizePizza(SizePizza.SMALL));
         dispatch(basketActions.setViewDough(ViewDough.TRADITIONAL));
         // сброс цены в селекторе
         if (onCloseModal) onCloseModal();
      }, []);

      useImperativeHandle(ref, () => ({
         openModal,
      }));

      return (
         <Modal
            onAnimate={handleAnimate}
            isOpen={isOpenModal}
            onClose={onClose}
            zIndex={isMobile ? 17 : undefined}
            className={classNames(
               cls.modal,
               { [cls.modalActive]: isClosing },
               [],
            )}
            delayClose={modalDelay}
            buttonCloseHeight={isMobile ? 30 : 40}
            buttonCloseRight={isMobile ? 25 : 30}
            buttonCloseTop={isMobile ? 25 : 30}
            buttonCloseWidth={isMobile ? 30 : 40}
         >
            {productInfo && (
               <OrderProduct
                  onCloseModal={onClose}
                  productInfo={productInfo}
                  existingOrder={existingOrder}
               />
            )}
         </Modal>
      );
   },
);
export const ModalOrderProductMemo = memo(ModalOrderProduct);
