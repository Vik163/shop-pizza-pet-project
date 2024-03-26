import {
   createEntityAdapter,
   createSlice,
   PayloadAction,
} from '@reduxjs/toolkit';
import { LOCALSTORAGE_PRODUCTS_VIEW_KEY } from '@/shared/const/localstorage';
import { fetchViewProducts } from '../../model/services/fetchViewProducts';
import { MainPageSchema, ViewProducts } from '../types/mainPageSchema';
import { Product, ProductView } from '@/entities/Product';
import { fetchPopularProducts } from '../services/fetchPopularProducts';
import { fetchActions } from '../services/fetchActions';
import { StateSchema } from '@/app/providers/StoreProvider';

// 8_4
const initialStateMainPage: MainPageSchema = {
   isLoading: false,
   isLoadingProducts: false,
   isLoadingPopularProducts: false,
   error: undefined,
   view: 'pizzas',
   page: 1,
   ids: [],
   entities: {},
   hasMore: true,
   //    _inited: false,
   items: [],
   cards: {},
   popularProducts: [],
   actionItems: [],
   limit: 0,
   //    sort: ArticleSortField.CREATED,
   //    search: '',
   //    type: ArticleType.ALL,
};

export const productsAdapter = createEntityAdapter<Product>({
   selectId: (product) => product._id,
});

// Селекторы
export const getEntityProducts = productsAdapter.getSelectors<StateSchema>(
   (state) => state.mainPage || productsAdapter.getInitialState(),
);

const mainPageSlice = createSlice({
   name: 'mainPageSlice',
   initialState: productsAdapter.getInitialState(initialStateMainPage),
   reducers: {
      setProducts: (state, action: PayloadAction<ViewProducts>) => {
         // console.log('action.payload:', action.payload);
         state.cards = action.payload;
      },
      setView: (state, action: PayloadAction<ProductView>) => {
         state.view = action.payload;
         localStorage.setItem(LOCALSTORAGE_PRODUCTS_VIEW_KEY, action.payload);
      },
      setPage: (state, action: PayloadAction<number>) => {
         state.page = action.payload;
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
         .addCase(fetchViewProducts.pending, (state) => {
            state.error = undefined;
            state.isLoadingProducts = true;
         })
         .addCase(fetchViewProducts.fulfilled, (state, { payload }) => {
            state.isLoadingProducts = false;
            state.view = payload.view;
            state.page = payload.page;
            state.limit = payload.limit;
            state.totalItems = payload.totalItems;
            state.hasMore = payload.hasMore;

            // addMany добавляет в конец, setAll перезатирает
            if (payload.replace) {
               productsAdapter.setAll(state, payload.items);
            } else {
               productsAdapter.addMany(state, payload.items);
            }
         })
         .addCase(fetchViewProducts.rejected, (state, action) => {
            state.isLoadingProducts = false;
            state.error = action.payload;
         })
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
         })
         .addCase(fetchActions.pending, (state) => {
            state.error = undefined;
            state.isLoading = true;
         })
         .addCase(fetchActions.fulfilled, (state, action) => {
            state.isLoading = false;
            state.actionItems = action.payload;
         })
         .addCase(fetchActions.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
         });
   },
});

export const { reducer: mainPageReducer, actions: mainPageActions } =
   mainPageSlice;
