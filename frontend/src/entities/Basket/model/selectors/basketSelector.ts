import { StateSchema } from '@/app/providers/StoreProvider';

export const getSizePizza = (state: StateSchema) =>
   state.basket?.sizePizza || 'small';
export const getDoughView = (state: StateSchema) =>
   state.basket?.dough || 'традиционное';
export const getBasketProducts = (state: StateSchema) =>
   state.basket?.basketData.basketProducts || [];
export const getBasketTotalPrice = (state: StateSchema) =>
   state.basket?.basketData.totalPrice || 0;
