import { FC, lazy } from 'react';
import { OrderPageProps } from './OrderPage';

export const OrderPageAsync = lazy<FC<OrderPageProps>>(
   () => import('./OrderPage'),
);
