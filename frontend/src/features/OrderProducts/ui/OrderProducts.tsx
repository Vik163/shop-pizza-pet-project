import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './OrderProducts.module.scss';
import { Product } from '@/entities/Product';

interface OrderProductsProps {
   className?: string;
   modalInfo: Product;
}

export const OrderProducts = memo((props: OrderProductsProps) => {
   const { className, modalInfo } = props;
   console.log('modalInfo:', modalInfo);

   return (
      <div className={classNames(cls.OrderProducts, {}, [className])}></div>
   );
});
