import { StateSchema } from '@/app/providers/StoreProvider';

export const getViewProducts = (state: StateSchema) =>
   state.mainPage.view || 'pizzas';
export const getLimitProducts = (state: StateSchema) =>
   state.mainPage?.limit || 4;
export const getPageProductsNum = (state: StateSchema) =>
   state.mainPage?.page || 1;
export const getPageHasMore = (state: StateSchema) => state.mainPage?.hasMore;
export const getIsLoadingProducts = (state: StateSchema) =>
   state.mainPage.isLoadingProducts;
