/* eslint-disable no-param-reassign */
import {
   PayloadAction,
   createEntityAdapter,
   createSlice,
} from '@reduxjs/toolkit';
import {
   ProductSchema,
   SavePageData,
   ScrollSchema,
} from '../types/productSchema';
import { Product } from '../types/product';
import { StateSchema } from '@/app/providers/StoreProvider';
import { fetchViewProducts } from '../services/fetchViewProducts';

const initialState: ProductSchema = {
   isLoadingProducts: false,
   error: undefined,
   paginateProduct: {},
   view: 'pizzas',
   totalItems: 0,
   hasMore: true,
   page: 1,
   savePage: {},
   ids: [],
   entities: {},
   items: [],
   saveScroll: {},
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
      setView: (state, { payload }: PayloadAction<string>) => {
         state.view = payload;
      },

      setSavePage: (state, { payload }: PayloadAction<SavePageData>) => {
         state.savePage = {
            ...state.savePage,
            [payload.view]: {
               view: payload.view,
               page: payload.page,
            },
         };
      },

      setScrollPosition: (state, { payload }: PayloadAction<ScrollSchema>) => {
         state.saveScroll = {
            ...state.saveScroll,
            [payload.path]: {
               path: payload.path,
               position: payload.position,
            },
         };
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchViewProducts.pending, (state) => {
            state.error = undefined;
            state.isLoadingProducts = true;
         })
         .addCase(
            fetchViewProducts.fulfilled,
            (state, { payload }: PayloadAction<ProductSchema>) => {
               state.isLoadingProducts = false;
               state.paginateProduct = {
                  ...state.paginateProduct,
                  [payload.view]: {
                     view: payload.view,
                     page: payload.page,
                     totalItems: payload.totalItems,
                     hasMore: payload.hasMore,
                  },
               };

               // addMany добавляет в конец, setAll перезатирает
               if (payload.replace) {
                  productsAdapter.setAll(state, payload.items);
               } else {
                  productsAdapter.addMany(state, payload.items);
               }
            },
         )
         .addCase(fetchViewProducts.rejected, (state, action) => {
            state.isLoadingProducts = false;
            state.error = action.payload;
         });
   },
});

export const { reducer: productReducer, actions: productActions } =
   productSlice;
