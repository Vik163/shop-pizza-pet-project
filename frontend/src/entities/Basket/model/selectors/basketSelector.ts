import { StateSchema } from '@/app/providers/StoreProvider';

export const getSizePizza = (state: StateSchema) =>
   state.basket.sizePizza || 'маленькая';
export const getDoughView = (state: StateSchema) =>
   state.basket.dough || 'традиционное';
export const getBasketProducts = (state: StateSchema) =>
   state.basket.basketProducts || [];
export const getBasketTotalPrice = (state: StateSchema) =>
   state.basket.totalPrice || 0;
