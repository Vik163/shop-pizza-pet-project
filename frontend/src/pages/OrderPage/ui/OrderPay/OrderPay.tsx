import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './OrderPay.module.scss';

interface OrderPayProps {
   className?: string;
}

export const OrderPay = memo((props: OrderPayProps) => {
   const { className } = props;

   return <div className={classNames(cls.OrderPay, {}, [className])}></div>;
});
