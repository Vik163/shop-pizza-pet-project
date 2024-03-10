import { StateSchema } from '@/app/providers/StoreProvider';

export const getMainPageIsLoading = (state: StateSchema) =>
   state.mainPage?.isLoading || false;
export const getMainPageError = (state: StateSchema) => state.mainPage?.error;
export const getMainPageNum = (state: StateSchema) => state.mainPage?.page || 1;
export const getMainPageHasMore = (state: StateSchema) =>
   state.mainPage?.hasMore;
export const getMainPageInited = (state: StateSchema) =>
   state.mainPage?._inited;
export const getMainPageSearch = (state: StateSchema) =>
   state.mainPage?.search ?? '';
