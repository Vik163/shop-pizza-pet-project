import { type StateSchema } from '@/app/providers/StoreProvider';

export const getTokenSelector = (state: StateSchema) =>
   state.csrfToken?._csrfToken;
