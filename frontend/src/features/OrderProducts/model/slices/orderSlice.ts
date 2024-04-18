/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IAdditives } from '../types/additives';
import { fetchAdditives } from '../services/fetchAddivites';
import { OrderSchema } from '../types/order';

const initialState: OrderSchema = {
   isLoading: false,
   error: '',
   addProductInBasket: undefined,
   order: [],
   price: 0,
};

const orderSlice = createSlice({
   name: 'order',
   initialState,
   reducers: {
      setOrderPrice: (state, { payload }: PayloadAction<number>) => {
         state.price = payload;
      },
      setPriceOneProduct: (state, { payload }: PayloadAction<number>) => {
         if (state.addProductInBasket) {
            state.addProductInBasket.price = payload;
         }
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchAdditives.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(
            fetchAdditives.fulfilled,
            (state, { payload }: PayloadAction<IAdditives[]>) => {
               state.isLoading = false;
               // state.additives = payload;
            },
         )
         .addCase(fetchAdditives.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
         });
   },
});

export const { actions: orderActions } = orderSlice;
export const { reducer: orderReducer } = orderSlice;
