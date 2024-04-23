import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './BasketItem.module.scss';

interface BasketItemProps {
   className?: string;
}

export const BasketItem = memo((props: BasketItemProps) => {
   const { className } = props;

   return <div className={classNames(cls.BasketItem, {}, [className])}></div>;
});
