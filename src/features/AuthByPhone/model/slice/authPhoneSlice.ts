/* eslint-disable no-param-reassign */
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { type AuthPhoneSchema } from '../types/authPhone';

const initialState: AuthPhoneSchema = {
   phoneNumber: '',
   isLoading: false,
   error: '',
   isConfirmCode: false,
};

const authPhoneSlice = createSlice({
   name: 'authPhone',
   initialState,
   reducers: {
      setPhoneNumber: (state, { payload }: PayloadAction<AuthPhoneSchema>) => {
         state.phoneNumber = payload.phoneNumber;
      },
      setIsLoading: (state, { payload }: PayloadAction<AuthPhoneSchema>) => {
         state.isLoading = payload.isLoading;
      },
      setIsError: (state, { payload }: PayloadAction<string>) => {
         state.error = payload;
      },
      setIsConfirmCode: (
         state,
         { payload }: PayloadAction<AuthPhoneSchema>,
      ) => {
         state.isConfirmCode = payload.isConfirmCode;
      },
   },
});

export const { actions: authPhoneActions } = authPhoneSlice;
export const { reducer: authPhoneReducer } = authPhoneSlice;
