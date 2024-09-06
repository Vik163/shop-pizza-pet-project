import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MainPageSchema } from '../types/mainPageSchema';
import { fetchPopularProducts } from '../services/fetchPopularProducts';
import { ViewProducts } from '@/entities/Product';

// 8_4
const initialStateMainPage: MainPageSchema = {
   isLoading: false,
   isLoadingPopularProducts: false,
   error: undefined,
   //    _inited: false,
   cards: {},
   popularProducts: [],
   //    sort: ArticleSortField.CREATED,
   //    search: '',
   //    type: ArticleType.ALL,
};

// export const productsAdapter = createEntityAdapter<Product>({
//    selectId: (product) => product._id,
// });

// // Селекторы
// export const getEntityProducts = productsAdapter.getSelectors<StateSchema>(
//    (state) => state.mainPage || productsAdapter.getInitialState(),
// );

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
