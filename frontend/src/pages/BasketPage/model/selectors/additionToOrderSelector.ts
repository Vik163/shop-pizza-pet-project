import { StateSchema } from '@/app/providers/StoreProvider';

export const getAdditionToOrder = (state: StateSchema) =>
   state.basketPage?.additions;
