/* eslint-disable no-param-reassign */
import {
   PayloadAction,
   createEntityAdapter,
   createSlice,
} from '@reduxjs/toolkit';
import { ProductSchema } from '../types/productSchema';
import { Product, ProductView } from '../types/product';
import { StateSchema } from '@/app/providers/StoreProvider';
import { fetchViewProducts } from '../services/fetchViewProducts';
import { LOCALSTORAGE_PRODUCTS_VIEW_KEY } from '@/shared/const/localstorage';

// const productAdapter = createEntityAdapter

const initialState: ProductSchema = {
   isLoadingProducts: false,
   error: undefined,
   view: 'pizzas',
   page: 1,
   ids: [],
   entities: {},
   hasMore: true,
   items: [],
   limit: 0,
   totalItems: 0,
};

export const productsAdapter = createEntityAdapter<Product>({
   selectId: (product) => product._id,
});

// Селекторы
export const getEntityProducts = productsAdapter.getSelectors<StateSchema>(
   (state) => state.product || productsAdapter.getInitialState(),
);

const productSlice = createSlice({
   name: 'productSlice',
   initialState: productsAdapter.getInitialState(initialState),
   reducers: {
      setView: (state, action: PayloadAction<ProductView>) => {
         state.view = action.payload;
         localStorage.setItem(LOCALSTORAGE_PRODUCTS_VIEW_KEY, action.payload);
      },
      setPage: (state, action: PayloadAction<number>) => {
         state.page = action.payload;
      },
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
         });
   },
});

export const { reducer: productReducer, actions: productActions } =
   productSlice;
