/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
   BasketData,
   BasketSchema,
   TDoughPizza,
   TSizePizza,
} from '../types/basket';

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
   extraReducers: () => {},
});

export const { actions: basketActions } = basketSlice;
export const { reducer: basketReducer } = basketSlice;
