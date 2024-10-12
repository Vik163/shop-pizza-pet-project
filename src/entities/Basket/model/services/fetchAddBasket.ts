import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { $apiTokens } from '@/shared/api/api';
import { BasketData, BasketOneProduct } from '../types/basket';
import { LOCALSTORAGE_USER_KEY } from '@/shared/const/localstorage';

export const fetchAddBasket = createAsyncThunk<
   BasketData,
   BasketOneProduct,
   ThunkConfig<string>
>('orderProducts/fetchAddBasket', async (order, thunkApi) => {
   const { rejectWithValue } = thunkApi;

   const userId = localStorage.getItem(LOCALSTORAGE_USER_KEY);

   try {
      const basketData = await $apiTokens.post(
         `/users/${userId}/basket`,
         order,
      );
      const basket = basketData.data;

      if (!basket) rejectWithValue('Товары в корзине не обновились');

      return basket;
   } catch (err) {
      console.log(err);

      rejectWithValue('Товары в корзине не обновились');
   }
});
