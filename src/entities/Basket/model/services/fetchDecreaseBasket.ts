import { createAsyncThunk } from '@reduxjs/toolkit';
import { BasketData } from '../types/basket';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { $apiTokens } from '@/shared/api/api';
import { LOCALSTORAGE_USER_KEY } from '@/shared/const/localstorage';

export const fetchDecreaseBasket = createAsyncThunk<
   BasketData,
   string,
   ThunkConfig<string>
>('basket/fetchDecreaseBasket', async (id, thunkApi) => {
   const { rejectWithValue } = thunkApi;
   try {
      const userId = localStorage.getItem(LOCALSTORAGE_USER_KEY);

      const basketData = await $apiTokens.put(`/users/${userId}/basket/${id}`);

      if (!basketData)
         rejectWithValue('Не удалось уменьшить количество товаров в корзине');
      const basket = basketData.data;

      return basket;
   } catch (err) {
      console.log(err);
      rejectWithValue('Не удалось уменьшить количество товаров в корзине');
   }
});
