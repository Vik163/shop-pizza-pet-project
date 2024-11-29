import { StateSchema } from '@/app/providers/StoreProvider';
import { SizePizza, ViewDough } from '@/shared/const/product_const';

export const getSizePizza = (state: StateSchema) =>
   state.basket.sizePizza || SizePizza.SMALL;
export const getDoughView = (state: StateSchema) =>
   state.basket.dough || ViewDough.TRADITIONAL;
export const getBasketProducts = (state: StateSchema) =>
   state.basket.basketProducts || [];
export const getBasketTotalPrice = (state: StateSchema) =>
   state.basket.totalPrice || 0;
export const getErrorBasket = (state: StateSchema) => state.basket.error;
