import { createAsyncThunk } from '@reduxjs/toolkit';
import { type ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';
import { type Product } from '@/entities/Product';

interface FetchProductsListProps {}

export const fetchProductsList = createAsyncThunk<
   Product[],
   FetchProductsListProps,
   ThunkConfig<string>
>('mainPage/fetchProductsList', async (_props, thunkApi) => {
   const { extra, rejectWithValue, getState } = thunkApi;

   try {
      const response = await extra.api.get<Product[]>('/cards');
      if (!response.data) {
         throw new Error();
      }

      console.log(response.data);
      return response.data;
   } catch (e) {
      return rejectWithValue('error');
   }
});
