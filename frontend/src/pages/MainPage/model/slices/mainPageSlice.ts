import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchProductsList } from '../services/fetchProductsList/fetchProductsList';
import { Product } from '@/entities/Product/model/types/product';
import { MainPageShema } from '../types/mainPageSchema';

// const productAdapter = createEntityAdapter

const initialState: MainPageShema = {
   error: undefined,
   isLoading: false,
   cards: [],
};

const mainPageSlice = createSlice({
   name: 'mainPageSlice',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchProductsList.pending, (state, action) => {
            state.isLoading = true;
         })
         .addCase(fetchProductsList.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cards = action.payload;
         })
         .addCase(fetchProductsList.rejected, (state, action) => {
            state.isLoading = false;
            // state.error = action.payload
         });
   },
});

export const { reducer: mainPageReducer, actions: mainPageActions } =
   mainPageSlice;
