import { createAsyncThunk } from '@reduxjs/toolkit';
import { BasketData } from '../types/basket';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { $apiTokens } from '@/shared/api/api';

export const fetchDecreaseBasket = createAsyncThunk<
   BasketData,
   string,
   ThunkConfig<string>
>('basket/fetchDecreaseBasket', async (id, thunkApi) => {
   const { rejectWithValue } = thunkApi;
   try {
      const basketData = await $apiTokens.put(`/order/basket/${id}`);

      if (!basketData)
         rejectWithValue('Не удалось уменьшить количество товаров в корзине');
      const basket = basketData.data;

      return basket;
   } catch (err) {
      console.log(err);
      rejectWithValue('Не удалось уменьшить количество товаров в корзине');
   }
});
