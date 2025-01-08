import { createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '@/entities/Product';
import { type ThunkConfig } from '@/app/providers/StoreProvider';
import { $api } from '@/shared/api/axiosApi';

export const fetchPopularProducts = createAsyncThunk<
   Product[],
   void,
   ThunkConfig<string>
>('product/fetchPopularProducts', async (_, thunkApi) => {
   const { rejectWithValue } = thunkApi;

   try {
      const popularProducts = (await $api.get('/products/popular')).data;
      if (!popularProducts) {
         return rejectWithValue('Товары не найдены');
      }

      return popularProducts;
   } catch (e) {
      return rejectWithValue('error');
   }
});
