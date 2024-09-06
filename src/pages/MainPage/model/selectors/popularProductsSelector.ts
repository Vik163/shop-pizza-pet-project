import { StateSchema } from '@/app/providers/StoreProvider';

export const getPopularProducts = (state: StateSchema) =>
   state.mainPage.popularProducts || null;
export const getIsLoadingPopularProducts = (state: StateSchema) =>
   state.mainPage.isLoadingPopularProducts || null;
