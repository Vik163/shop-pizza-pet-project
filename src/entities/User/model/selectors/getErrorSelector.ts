import { type StateSchema } from '@/app/providers/StoreProvider';

export const getErrorSelector = (state: StateSchema) => state.user.error;
