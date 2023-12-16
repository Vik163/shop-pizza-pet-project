import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthPhoneSchema } from '../types/authPhone';

const initialState: AuthPhoneSchema = {
   phoneNumber: '',
};

const authPhoneSlice = createSlice({
   name: 'authPhone',
   initialState,
   reducers: {
      setPhoneNumber: (state, { payload }: PayloadAction<AuthPhoneSchema>) => {
         state.phoneNumber = payload.phoneNumber;
      },
   },
});

export const { actions: authPhoneActions } = authPhoneSlice;
export const { reducer: authPhoneReducer } = authPhoneSlice;
