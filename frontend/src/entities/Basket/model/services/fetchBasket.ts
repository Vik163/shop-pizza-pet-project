import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { $api } from '@/shared/api/api';
import { BasketOneProduct } from '../types/basket';

export const fetchBasket = createAsyncThunk<
   BasketOneProduct[],
   void,
   ThunkConfig<string>
>('orderProducts/fetchBasket', async (_, thunkApi) => {
   const { rejectWithValue } = thunkApi;

   try {
      const basketData = await $api.get('/order/basket');
      const basket = basketData.data;

      if (!basket) rejectWithValue('Корзина не найдена');

      return basket;
   } catch (err) {
      console.log(err);
      rejectWithValue('Корзина не найдена');
   }
});
