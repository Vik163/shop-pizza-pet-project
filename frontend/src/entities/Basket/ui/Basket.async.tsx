import { FC, lazy } from 'react';
import { BasketProps } from './Basket';

export const BasketAsync = lazy<FC<BasketProps>>(() => import('./Basket'));
