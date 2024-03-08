import { createAsyncThunk } from '@reduxjs/toolkit';
// eslint-disable-next-line ulbi-tv-plugin/layer-imports
import { type ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';
import { Product } from '@/entities/Product';

// interface FetchProductsListProps {}

export const fetchPopularProducts = createAsyncThunk<
   Product[],
   void,
   ThunkConfig<string>
>('product/fetchPopularProducts', async (_, thunkApi) => {
   const { extra, rejectWithValue } = thunkApi;

   try {
      const response = await extra.api.get<Product[]>('/products/popular');
      if (!response.data) {
         rejectWithValue('Товары не найдены');
      }

      // console.log(response.data);
      return response.data;
   } catch (e) {
      return rejectWithValue('error');
   }
});
