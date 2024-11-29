/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchAddBasket } from '../services/fetchAddBasket';
import { fetchBasket } from '../services/fetchBasket';
import {
   BasketData,
   BasketSchema,
   TDoughPizza,
   TSizePizza,
} from '../types/basket';
import { fetchDecreaseBasket } from '../services/fetchDecreaseBasket';
import { fetchDelete } from '../services/fetchDelete';

const initialState: BasketSchema = {
   error: '',
   basketProducts: [],
   totalPrice: 0,
   price: 0,
   sizePizza: 'маленькая',
   dough: 'традиционное',
};

const basketSlice = createSlice({
   name: 'basket',
   initialState,
   reducers: {
      setOrderPrice: (state, { payload }: PayloadAction<number>) => {
         state.price = payload;
      },
      setSizePizza: (state, { payload }: PayloadAction<TSizePizza>) => {
         state.sizePizza = payload;
      },
      setViewDough: (state, { payload }: PayloadAction<TDoughPizza>) => {
         state.dough = payload;
      },
      setBasket: (state, { payload }: PayloadAction<BasketData>) => {
         state.basketProducts = payload.basketProducts;
         state.totalPrice = payload.totalPrice;
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(
            fetchAddBasket.fulfilled,
            (state, { payload }: PayloadAction<BasketData>) => {
               state.basketProducts = payload.basketProducts;
               state.totalPrice = payload.totalPrice;
            },
         )
         .addCase(fetchAddBasket.rejected, (state, action) => {
            state.error = action.error.message;
         })
         .addCase(
            fetchBasket.fulfilled,
            (state, { payload }: PayloadAction<BasketData>) => {
               state.basketProducts = payload.basketProducts;
               state.totalPrice = payload.totalPrice;
            },
         )
         .addCase(
            fetchBasket.rejected,
            (state, { payload }: PayloadAction<string | undefined>) => {
               state.error = payload;
            },
         )
         .addCase(
            fetchDecreaseBasket.fulfilled,
            (state, { payload }: PayloadAction<BasketData>) => {
               state.basketProducts = payload.basketProducts;
               state.totalPrice = payload.totalPrice;
            },
         )
         .addCase(fetchDecreaseBasket.rejected, (state, action) => {
            state.error = action.error.message;
         })
         .addCase(
            fetchDelete.fulfilled,
            (state, { payload }: PayloadAction<BasketData>) => {
               state.basketProducts = payload.basketProducts;
               state.totalPrice = payload.totalPrice;
            },
         )
         .addCase(fetchDelete.rejected, (state, action) => {
            state.error = action.error.message;
         });
   },
});

export const { actions: basketActions } = basketSlice;
export const { reducer: basketReducer } = basketSlice;
