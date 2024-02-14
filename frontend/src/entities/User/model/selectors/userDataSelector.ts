import { type StateSchema } from '@/app/providers/StoreProvider';

export const getUserData = (state: StateSchema) => state.user.authData;
export const getInited = (state: StateSchema) => state.user._inited;
