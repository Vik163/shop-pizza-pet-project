import { type StateSchema } from '@/app/providers/StoreProvider';

export const getPhoneNumber = (state: StateSchema) =>
   state.authPhone?.phoneNumber;

export const getIsLoading = (state: StateSchema) => state.authPhone?.isLoading;
export const getIsConfirmCode = (state: StateSchema) =>
   state.authPhone?.isConfirmCode;
export const getIsError = (state: StateSchema) => state.authPhone?.error;
