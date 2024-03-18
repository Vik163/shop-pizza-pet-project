// import { createAsyncThunk } from '@reduxjs/toolkit';
// // eslint-disable-next-line ulbi-tv-plugin/layer-imports
// import { type ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';
// import { Products } from '../../types/product';

// // interface FetchProductsListProps {}

// export const fetchProductsList = createAsyncThunk<
//    Products,
//    void,
//    ThunkConfig<string>
// >('product/fetchProductsList', async (_, thunkApi) => {
//    const { extra, rejectWithValue } = thunkApi;

//    try {
//       const response = await extra.api.get<Products>('/pizzas');
//       if (!response.data) {
//          rejectWithValue('Товары не найдены');
//       }

//       // console.log(response.data);
//       return response.data;
//    } catch (e) {
//       return rejectWithValue('error');
//    }
// });
