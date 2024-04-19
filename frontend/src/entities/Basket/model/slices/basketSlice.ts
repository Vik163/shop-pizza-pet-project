/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchAddBasket } from '../services/fetchAddBasket';
import { fetchBasket } from '../services/fetchBasket';
import {
   BasketOneProduct,
   BasketSchema,
   DoughPizza,
   SizePizza,
} from '../types/basket';

const initialState: BasketSchema = {
   error: '',
   basket: [],
   price: 0,
   sizePizza: 'small',
   dough: 'традиционное',
};

const basketSlice = createSlice({
   name: 'basket',
   initialState,
   reducers: {
      setOrderPrice: (state, { payload }: PayloadAction<number>) => {
         state.price = payload;
      },
      setSizePizza: (state, { payload }: PayloadAction<SizePizza>) => {
         state.sizePizza = payload;
      },
      setViewDough: (state, { payload }: PayloadAction<DoughPizza>) => {
         state.dough = payload;
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(
            fetchAddBasket.fulfilled,
            (state, { payload }: PayloadAction<BasketOneProduct[]>) => {
               state.basket = payload;
            },
         )
         .addCase(fetchAddBasket.rejected, (state, action) => {
            state.error = action.error.message;
         })
         .addCase(
            fetchBasket.fulfilled,
            (state, action: PayloadAction<BasketOneProduct[]>) => {
               state.basket = action.payload;
            },
         )
         .addCase(fetchBasket.rejected, (state, action) => {
            state.error = action.error.message;
         });
   },
});

export const { actions: basketActions } = basketSlice;
export const { reducer: basketReducer } = basketSlice;
