import { StateSchema } from '@/app/providers/StoreProvider';

export const getActions = (state: StateSchema) =>
   state.actions.actionItems || null;
