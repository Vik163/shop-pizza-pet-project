/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { OrderSchema } from '../types/order';

const initialState: OrderSchema = {
   error: '',
   basket: [],
   price: 0,
   sizePizza: 'small',
   dough: 'традиционное',
};

const orderSlice = createSlice({
   name: 'order',
   initialState,
   reducers: {
      // setOrderPrice: (state, { payload }: PayloadAction<number>) => {
      //    state.price = payload;
      // },
   },
   extraReducers: (builder) => {
      // builder
      //    .addCase(
      //       fetchAddBasket.fulfilled,
      //       (state, { payload }: PayloadAction<BasketOneProduct[]>) => {
      //          state.basket = payload;
      //       },
      //    )
      //    .addCase(fetchAddBasket.rejected, (state, action) => {
      //       state.error = action.error.message;
      //    })
      //    .addCase(
      //       fetchBasket.fulfilled,
      //       (state, action: PayloadAction<BasketOneProduct[]>) => {
      //          state.basket = action.payload;
      //       },
      //    )
      //    .addCase(fetchBasket.rejected, (state, action) => {
      //       state.error = action.error.message;
      //    });
   },
});

export const { actions: orderActions } = orderSlice;
export const { reducer: orderReducer } = orderSlice;
