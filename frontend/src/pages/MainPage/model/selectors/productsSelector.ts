import { StateSchema } from '@/app/providers/StoreProvider';
import { ProductView } from '@/entities/Product';

export const getProducts = (state: StateSchema) => state.mainPage.items;
export const getBlockTopScroll = (state: StateSchema) =>
   state.mainPage.blockTopScroll || '';
export const getViewProducts = (state: StateSchema) =>
   state.mainPage.view || ProductView.PIZZAS;
export const getLimitProducts = (state: StateSchema) =>
   state.mainPage?.limit || 4;
