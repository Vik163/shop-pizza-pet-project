import { StateSchema } from '@/app/providers/StoreProvider';

export const getActions = (state: StateSchema) =>
   state.mainPage.actionItems || null;
