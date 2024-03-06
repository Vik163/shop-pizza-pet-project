/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LOCALSTORAGE_PRODUCTS_VIEW_KEY } from '@/shared/const/localstorage';
import { fetchViewProducts } from '../../model/services/fetchViewProducts';
import { MainPageSchema } from '../types/mainPageSchema';
import { ProductView } from '@/entities/Product';

// 8_4
const initialState: MainPageSchema = {
   isLoading: false,
   error: undefined,
   view: ProductView.PIZZAS,
   //    page: 1,
   //    hasMore: true,
   //    _inited: false,
   cards: [],
   //    limit: 9,
   //    sort: ArticleSortField.CREATED,
   //    search: '',
   //    type: ArticleType.ALL,
};

const mainPageSlice = createSlice({
   name: 'mainPageSlice',
   initialState,
   reducers: {
      setView: (state, action: PayloadAction<ProductView>) => {
         state.view = action.payload;
         localStorage.setItem(LOCALSTORAGE_PRODUCTS_VIEW_KEY, action.payload);
      },
      //   setPage: (state, action: PayloadAction<number>) => {
      //      state.page = action.payload;
      //   },
      //   setSort: (state, action: PayloadAction<ArticleSortField>) => {
      //      state.sort = action.payload;
      //   },
      //   setType: (state, action: PayloadAction<ArticleType>) => {
      //      state.type = action.payload;
      //   },
      //   setSearch: (state, action: PayloadAction<string>) => {
      //      state.search = action.payload;
      //   },
      //   initState: (state) => {
      //      const view = localStorage.getItem(
      //         ARTICLES_VIEW_LOCALSTORAGE_KEY,
      //      ) as ArticleView;
      //      state.view = view;
      //      // пагинация
      //      state.limit = view === ArticleView.BIG ? 4 : 9;
      //      state._inited = true; // 9_1 5min
      //   },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchViewProducts.pending, (state) => {
            state.error = undefined;
            state.isLoading = true;
         })
         .addCase(
            fetchViewProducts.fulfilled,
            (
               state,
               action, // 9_3 27min
            ) => {
               state.isLoading = false;
               console.log('state.cards:', state.cards);
               state.cards = action.payload;
               // 8_5 21:12min
               //    state.hasMore = action.payload.length >= state.limit;
            },
         )
         .addCase(fetchViewProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
         });
   },
});

export const { reducer: mainPageReducer, actions: mainPageActions } =
   mainPageSlice;
