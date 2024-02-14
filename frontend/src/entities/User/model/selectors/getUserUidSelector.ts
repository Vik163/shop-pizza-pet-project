import { type StateSchema } from '@/app/providers/StoreProvider';

export const getUserUidSelector = (state: StateSchema) => state.user._userUid;
