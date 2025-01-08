import { StateSchema } from '@/app/providers/StoreProvider';

export const getMainPageIsLoading = (state: StateSchema) =>
   state.mainPage?.isLoading || false;
export const getMainPageError = (state: StateSchema) => state.mainPage?.error;

// export const getMainPageInited = (state: StateSchema) =>
//    state.mainPage?._inited;
export const getMainPageSearch = (state: StateSchema) =>
   state.mainPage?.search ?? '';
