import { StateSchema } from '@/app/providers/StoreProvider';

export const getOpenPopup = (state: StateSchema) =>
   state.modal?.isOpenPopup || false;
