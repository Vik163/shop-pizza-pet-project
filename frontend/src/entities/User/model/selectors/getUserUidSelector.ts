import { StateSchema } from '@/app/providers/StoreProvider';

export const getUserUidSelector = (state: StateSchema) => state.user._userUid;
