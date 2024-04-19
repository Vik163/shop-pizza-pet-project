import { StateSchema } from '@/app/providers/StoreProvider';

export const getSizePizza = (state: StateSchema) =>
   state.basket?.sizePizza || 'small';
export const getDoughView = (state: StateSchema) =>
   state.basket?.dough || 'традиционное';
export const getBasket = (state: StateSchema) => state.basket?.basket;
