import { createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '@/entities/Product';
import { type ThunkConfig } from '@/app/providers/StoreProvider';
import { setPopularProducts } from '../../api/popularProductApi';

export const fetchPopularProducts = createAsyncThunk<
   Product[],
   void,
   ThunkConfig<string>
>('product/fetchPopularProducts', async (_, thunkApi) => {
   const { rejectWithValue, dispatch } = thunkApi;

   try {
      const popularProducts = await dispatch(setPopularProducts()).unwrap();
      if (!popularProducts) {
         return rejectWithValue('Товары не найдены');
      }

      return popularProducts;
   } catch (e) {
      return rejectWithValue('error');
   }
});
