// /* eslint-disable no-param-reassign */
// import { PayloadAction, createSlice } from '@reduxjs/toolkit';
// import { fetchProductsList } from '../services/fetchInitProducts/fetchInitProducts';
// import { ProductShema, Products } from '../types/product';

// // const productAdapter = createEntityAdapter

// const initialState: ProductShema = {
//    error: undefined,
//    isLoading: false,
//    cards: [],
// };

// const productSlice = createSlice({
//    name: 'productSlice',
//    initialState,
//    reducers: {},
//    extraReducers: (builder) => {
//       builder
//          .addCase(fetchProductsList.pending, (state) => {
//             state.isLoading = true;
//          })
//          .addCase(
//             fetchProductsList.fulfilled,
//             (state, { payload }: PayloadAction<Products>) => {
//                state.isLoading = false;
//                state.cards = payload;
//             },
//          )
//          .addCase(fetchProductsList.rejected, (state, action) => {
//             state.isLoading = false;
//             state.error = action.payload;
//          });
//    },
// });

// export const { reducer: productReducer, actions: productActions } =
//    productSlice;
