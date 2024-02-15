/* eslint-disable no-param-reassign */
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { type AuthPhoneSchema } from '../types/authPhone';
import { fetchSignupUser } from '../services/fetchSignupUser';

const initialState: AuthPhoneSchema = {
   phoneNumber: '',
   isLoading: false,
   error: null,
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
      setIsError: (state, { payload }: PayloadAction<AuthPhoneSchema>) => {
         if (state.error) {
            state.error.message = payload.error?.message;
         }
      },
      setIsConfirmCode: (
         state,
         { payload }: PayloadAction<AuthPhoneSchema>,
      ) => {
         state.isConfirmCode = payload.isConfirmCode;
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchSignupUser.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(fetchSignupUser.fulfilled, (state) => {
            state.isLoading = false;
         })
         .addCase(fetchSignupUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
         });
   },
});

export const { actions: authPhoneActions } = authPhoneSlice;
export const { reducer: authPhoneReducer } = authPhoneSlice;
