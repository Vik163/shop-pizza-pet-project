/* eslint-disable no-param-reassign */
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { type AuthPhoneSchema } from '../types/authPhone';
import { fetchSignupUser } from '../services/fetchSignupUser';

const initialState: AuthPhoneSchema = {
   phoneNumber: '',
   isLoading: false,
   error: {},
};

const authPhoneSlice = createSlice({
   name: 'authPhone',
   initialState,
   reducers: {
      setPhoneNumber: (state, { payload }: PayloadAction<AuthPhoneSchema>) => {
         state.phoneNumber = payload.phoneNumber;
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
