import { createSlice } from '@reduxjs/toolkit';
import { OrderPageSchema } from '../types/order';

const initialState: OrderPageSchema = {
   isLoading: false,
   error: '',
   delivery: '',
};

const orderPageSlice = createSlice({
   name: 'basketPage',
   initialState,
   reducers: {
      // setTypeDelivery: (state, { payload }: PayloadAction<string>) => {
      //    state.delivery = payload;
      // },
   },
});

export const { actions: orderPageActions } = orderPageSlice;
export const { reducer: orderPageReducer } = orderPageSlice;
