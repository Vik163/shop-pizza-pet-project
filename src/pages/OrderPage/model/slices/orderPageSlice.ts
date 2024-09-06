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
   extraReducers: (builder) => {
      // builder
      //    .addCase(fetchAdditionToOrder.pending, (state) => {
      //       state.isLoading = true;
      //    })
      //    .addCase(
      //       fetchAdditionToOrder.fulfilled,
      //       (state, { payload }: PayloadAction<Product[]>) => {
      //          state.isLoading = false;
      //       },
      //    )
      //    .addCase(fetchAdditionToOrder.rejected, (state, action) => {
      //       state.isLoading = false;
      //       state.error = action.error.message;
      //    });
   },
});

export const { actions: orderPageActions } = orderPageSlice;
export const { reducer: orderPageReducer } = orderPageSlice;
