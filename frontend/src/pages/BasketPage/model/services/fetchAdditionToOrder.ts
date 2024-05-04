import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Product } from '@/entities/Product';
import { $api } from '@/shared/api/api';

export const fetchAdditionToOrder = createAsyncThunk<
   Product[],
   void,
   ThunkConfig<string>
>('basketPage/fetchAdditionToOrder', async (_, thunkApi) => {
   const { rejectWithValue } = thunkApi;

   try {
      const data = await $api.get('/products/addition_order');

      const additions = data.data;

      if (!additions) rejectWithValue('Дополнения к заказу не найдены');

      return additions;
   } catch (err) {
      console.log(err);
      rejectWithValue('Дополнения к заказу не найдены');
   }
});
