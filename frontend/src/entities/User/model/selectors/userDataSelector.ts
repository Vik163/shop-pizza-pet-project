import { StateSchema } from '@/app/providers/StoreProvider';
import { UserSchema } from '../types/user';

export const getUserData = (state: StateSchema) => state.user.authData;
export const getInited = (state: StateSchema) => state.user._inited;
