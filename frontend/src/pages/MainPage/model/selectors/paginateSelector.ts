import { StateSchema } from '@/app/providers/StoreProvider';
import { paginateElements } from '@/shared/const/paginateElements';

export const getViewProducts = (state: StateSchema) =>
   state.mainPage.view || 'pizzas';
export const getLimitProducts = (state: StateSchema) =>
   state.mainPage?.limit || paginateElements;
export const getPageProductsNum = (state: StateSchema) =>
   state.mainPage?.page || 1;
export const getPageHasMore = (state: StateSchema) => state.mainPage?.hasMore;
export const getIsLoadingProducts = (state: StateSchema) =>
   state.mainPage.isLoadingProducts;
