import { type StateSchema } from '@/app/providers/StoreProvider';

export const getUserData = (state: StateSchema) => state.user.authData;
export const getInited = (state: StateSchema) => state.user._inited;
export const getUserName = (state: StateSchema) => state.user.authData?.name;
export const getUserEmail = (state: StateSchema) => state.user.authData?.email;
export const getUserPhone = (state: StateSchema) =>
   state.user.authData?.phoneNumber;
export const getUserBirthday = (state: StateSchema) =>
   state.user.authData?.birthday;
