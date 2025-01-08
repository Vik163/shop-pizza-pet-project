import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Product } from '@/entities/Product';
import { $api } from '@/shared/api/axiosApi';

export const fetchAdditionToOrder = createAsyncThunk<
   Product[],
   void,
   ThunkConfig<string>
>('basketPage/fetchAdditionToOrder', async (_, thunkApi) => {
   const { rejectWithValue } = thunkApi;

   try {
      const additions = (await $api.get('/products/addition_order')).data;

      if (!additions) return rejectWithValue('Дополнения к заказу не найдены');

      return additions;
   } catch (err) {
      console.log(err);
      return rejectWithValue('Дополнения к заказу не найдены');
   }
});
