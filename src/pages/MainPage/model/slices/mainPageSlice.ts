import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MainPageSchema } from '../types/mainPageSchema';
import { fetchPopularProducts } from '../services/fetchPopularProducts';
import { ViewProducts } from '@/entities/Product';

const initialStateMainPage: MainPageSchema = {
   isLoading: false,
   isLoadingPopularProducts: false,
   error: undefined,
   cards: {},
   popularProducts: [],
};

const mainPageSlice = createSlice({
   name: 'mainPageSlice',
   initialState: initialStateMainPage,
   reducers: {
      setProducts: (state, action: PayloadAction<ViewProducts>) => {
         state.cards = action.payload;
      },

      //   setSort: (state, action: PayloadAction<ArticleSortField>) => {
      //      state.sort = action.payload;
      //   },
      //   setType: (state, action: PayloadAction<ArticleType>) => {
      //      state.type = action.payload;
      //   },
      //   setSearch: (state, action: PayloadAction<string>) => {
      //      state.search = action.payload;
      //   },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchPopularProducts.pending, (state) => {
            state.error = undefined;
            state.isLoadingPopularProducts = true;
         })
         .addCase(fetchPopularProducts.fulfilled, (state, action) => {
            state.isLoadingPopularProducts = false;
            state.popularProducts = action.payload;
         })
         .addCase(fetchPopularProducts.rejected, (state, action) => {
            state.isLoadingPopularProducts = false;
            state.error = action.payload;
         });
   },
});

export const { reducer: mainPageReducer, actions: mainPageActions } =
   mainPageSlice;
