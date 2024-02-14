import { type StateSchema } from '@/app/providers/StoreProvider';

export const getPhoneNumber = (state: StateSchema) =>
   state.authPhone?.phoneNumber;
