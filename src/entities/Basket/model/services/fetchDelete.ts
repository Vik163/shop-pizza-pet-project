import { createAsyncThunk } from '@reduxjs/toolkit';
import { $apiTokens } from '@/shared/api/api';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { BasketData } from '../types/basket';
import { LOCALSTORAGE_USER_KEY } from '@/shared/const/localstorage';

export const fetchDelete = createAsyncThunk<
   BasketData,
   string,
   ThunkConfig<string>
>('basket/fetchDelete', async (id, thunkApi) => {
   const { rejectWithValue } = thunkApi;

   try {
      const userId = localStorage.getItem(LOCALSTORAGE_USER_KEY);

      const basketData = await $apiTokens.delete(
         `/users/${userId}/basket/${id}`,
      );

      const basket = basketData.data;

      return basket;
   } catch (err) {
      console.log(err);
      rejectWithValue('Не удалось удалить из корзины товар');
   }
});
