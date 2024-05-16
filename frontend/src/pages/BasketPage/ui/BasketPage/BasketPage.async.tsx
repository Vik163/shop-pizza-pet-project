import { FC, lazy } from 'react';
import { BasketPageProps } from './BasketPage';

export const BasketPageAsync = lazy<FC<BasketPageProps>>(
   () => import('./BasketPage'),
);
