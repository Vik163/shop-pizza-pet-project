import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { BasketPageSchema } from '../types/basketPage';
import { fetchAdditionToOrder } from '../services/fetchAdditionToOrder';
import { Product } from '@/entities/Product';

const initialState: BasketPageSchema = {
   additions: [],
   isLoading: false,
   error: '',
};

const basketPageSlice = createSlice({
   name: 'basketPage',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchAdditionToOrder.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(
            fetchAdditionToOrder.fulfilled,
            (state, { payload }: PayloadAction<Product[]>) => {
               state.isLoading = false;
               state.additions = payload;
            },
         )
         .addCase(fetchAdditionToOrder.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
         });
   },
});

export const { actions: basketPageActions } = basketPageSlice;
export const { reducer: basketPageReducer } = basketPageSlice;
