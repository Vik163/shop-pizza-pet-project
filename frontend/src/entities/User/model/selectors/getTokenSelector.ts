import { StateSchema } from '@/app/providers/StoreProvider';

export const getTokenSelector = (state: StateSchema) => state.user._token;
