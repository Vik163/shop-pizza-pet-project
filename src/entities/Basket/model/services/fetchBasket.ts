import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { $api } from '@/shared/api/api';
import { BasketData } from '../types/basket';

export const fetchBasket = createAsyncThunk<
   BasketData,
   string,
   ThunkConfig<string>
>('orderProducts/fetchBasket', async (id, thunkApi) => {
   const { rejectWithValue } = thunkApi;

   try {
      const basketData = await $api.get(`/users/${id}/basket`);
      const basket = basketData.data;

      if (!basket) rejectWithValue('Корзина не найдена');

      return basket;
   } catch (err) {
      console.log(err);
      rejectWithValue('Корзина не найдена');
   }
});
