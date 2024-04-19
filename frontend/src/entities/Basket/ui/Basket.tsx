import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Basket.module.scss';

export interface BasketProps {
   className?: string;
}

const Basket = memo((props: BasketProps) => {
   const { className } = props;

   return <div className={classNames(cls.Basket, {}, [className])}></div>;
});

export default Basket;
