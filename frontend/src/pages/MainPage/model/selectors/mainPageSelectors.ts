import { StateSchema } from '@/app/providers/StoreProvider';
import { ProductView } from '@/entities/Product';

export const getMainPageIsLoading = (state: StateSchema) =>
   state.mainPage?.isLoading || false;
export const getMainPageError = (state: StateSchema) => state.mainPage?.error;
export const getMainPageNum = (state: StateSchema) => state.mainPage?.page || 1;
export const getMainPageLimit = (state: StateSchema) =>
   state.mainPage?.limit || 9;
export const getMainPageHasMore = (state: StateSchema) =>
   state.mainPage?.hasMore;
export const getMainPageInited = (state: StateSchema) =>
   state.mainPage?._inited;
export const getMainPageSearch = (state: StateSchema) =>
   state.mainPage?.search ?? '';
export const getMainPageProducts = (state: StateSchema) => state.mainPage.cards;
export const getMainPageActions = (state: StateSchema) =>
   state.mainPage.actionCards || null;
export const getMainPagePopularProducts = (state: StateSchema) =>
   state.mainPage.popularProducts || null;
export const getMainPageView = (state: StateSchema) =>
   state.mainPage.view || ProductView.PIZZAS;
