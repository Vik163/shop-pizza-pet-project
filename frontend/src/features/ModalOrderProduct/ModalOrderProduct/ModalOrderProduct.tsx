import { Ref, forwardRef, memo, useImperativeHandle, useState } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './ModalOrderProduct.module.scss';
import { Product, getEntityProducts } from '@/entities/Product';
import { BasketOneProduct } from '@/entities/Basket';
import { Modal } from '@/shared/ui/Modal';
import { OrderProduct } from '../OrderProductsModal/OrderProduct';

interface ModalOrderProductProps {
   onCloseModal?: () => void;
}

export interface RefTypeModal {
   openModal: (cardProduct?: Product, basket?: BasketOneProduct) => void;
}

export const ModalOrderProduct = forwardRef(
   (props: ModalOrderProductProps, ref: Ref<RefTypeModal>) => {
      const { onCloseModal } = props;
      const [isClosing, setIsClosing] = useState(false);
      const [productInfo, setProductInfo] = useState<Product>();
      const [isOpenModal, setIsOpenModal] = useState(false);
      const [existingOrder, setExistingOrder] = useState<BasketOneProduct>();

      const products: Product[] = useSelector(getEntityProducts.selectAll);

      const handleAnimate = (bool: boolean) => {
         setIsClosing(bool);
      };

      const openModal = (cardProduct?: Product, basket?: BasketOneProduct) => {
         if (basket && basket.product) {
            const product = products.find(
               (item) => item.title === basket.product,
            );
            if (product) {
               setExistingOrder(basket);
               setProductInfo(product);
               setIsOpenModal(true);
            }
         } else {
            setProductInfo(cardProduct);
            setIsOpenModal(true);
         }
      };

      const onClose = () => {
         setProductInfo(undefined);
         setIsOpenModal(false);
         // сброс цены в селекторе
         if (onCloseModal) onCloseModal();
      };

      useImperativeHandle(ref, () => ({
         openModal,
      }));

      return (
         productInfo && (
            <Modal
               onAnimate={handleAnimate}
               isOpen={isOpenModal}
               onClose={onClose}
               className={classNames(
                  cls.modal,
                  { [cls.modalActive]: isClosing },
                  [],
               )}
               delayClose={300}
               lazy
               buttonCloseHeight={40}
               buttonCloseRight={30}
               buttonCloseTop={30}
               buttonCloseWidth={40}
            >
               <OrderProduct
                  onCloseModal={onClose}
                  productInfo={productInfo}
                  existingOrder={existingOrder}
               />
            </Modal>
         )
      );
   },
);
export const ModalOrderProductMemo = memo(ModalOrderProduct);
