import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { $apiTokens } from '@/shared/api/api';
import { BasketOneProduct } from '../types/basket';

export const fetchAddBasket = createAsyncThunk<
   BasketOneProduct[],
   BasketOneProduct,
   ThunkConfig<string>
>('orderProducts/fetchAddBasket', async (order, thunkApi) => {
   const { rejectWithValue } = thunkApi;

   try {
      const data = await $apiTokens.post('/order/basket', order);
      const basket = data.data;

      if (!basket) {
         rejectWithValue('Товары в корзине не обновились');
      }

      return basket;
   } catch (err) {
      console.log(err);

      rejectWithValue('Товары в корзине не обновились');
   }
});
