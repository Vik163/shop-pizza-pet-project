import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthPhoneSchema } from '../types/authPhone';
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
         .addCase(fetchSignupUser.pending, (state, action) => {
            state.isLoading = true;
         })
         .addCase(fetchSignupUser.fulfilled, (state, { payload }) => {
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
