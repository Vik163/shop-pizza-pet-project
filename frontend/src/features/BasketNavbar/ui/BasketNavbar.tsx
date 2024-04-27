import { memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './BasketNavbar.module.scss';
import { Modal } from '@/shared/ui/Modal';
import { Product, getEntityProducts } from '@/entities/Product';
// eslint-disable-next-line ulbi-tv-plugin/layer-imports
import { OrderProductsModal } from '@/features/OrderProducts';
import { Basket, BasketOneProduct } from '@/entities/Basket';

interface BasketNavbarProps {
   className?: string;
   isOpenModalBasket: boolean;
   onCloseBasketModal: () => void;
}

export const BasketNavbar = memo((props: BasketNavbarProps) => {
   const { className, isOpenModalBasket, onCloseBasketModal } = props;
   const [productInfo, setProductInfo] = useState<Product>();
   const [isOpenModalProduct, setIsOpenModalProduct] = useState(false);
   const [isClosing, setIsClosing] = useState(false);
   const products: Product[] = useSelector(getEntityProducts.selectAll);
   console.log('products:', products);

   const onModalProduct = (card: BasketOneProduct) => {
      onCloseBasketModal();
      setIsOpenModalProduct(true);

      console.log('card:', card);
   };

   const onCloseModalProduct = () => {
      setIsOpenModalProduct(false);
   };

   const handleAnimate = useCallback((bool: boolean) => {
      setIsClosing(bool);
   }, []);

   return (
      <div className={classNames(cls.BasketNavbar, {}, [className])}>
         {isOpenModalBasket && (
            <Modal
               isCenter={false}
               onAnimate={handleAnimate}
               isOpen={isOpenModalBasket}
               onClose={onCloseBasketModal}
               className={classNames(
                  cls.basketPopup,
                  { [cls.basketPopupActive]: isClosing },
                  [],
               )}
               delayClose={300}
               buttonCloseHeight={30}
               buttonCloseRight={20}
               buttonCloseTop={20}
               buttonCloseWidth={30}
            >
               <Basket onModalProduct={onModalProduct} />
            </Modal>
         )}
         {isOpenModalProduct && productInfo && (
            // если нет то модалка не встраивается
            <Modal
               onAnimate={handleAnimate}
               isOpen={isOpenModalProduct}
               onClose={onCloseModalProduct}
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
               <OrderProductsModal
                  onCloseModal={onCloseModalProduct}
                  productInfo={productInfo}
               />
            </Modal>
         )}
      </div>
   );
});
