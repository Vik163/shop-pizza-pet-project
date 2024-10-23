import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Product } from '@/entities/Product';
import { getAdditionalToOrder } from '../../api/basketPageApi';

export const fetchAdditionToOrder = createAsyncThunk<
   Product[],
   void,
   ThunkConfig<string>
>('basketPage/fetchAdditionToOrder', async (_, thunkApi) => {
   const { rejectWithValue, dispatch } = thunkApi;

   try {
      const additions = await dispatch(getAdditionalToOrder()).unwrap();

      if (!additions) return rejectWithValue('Дополнения к заказу не найдены');

      return additions;
   } catch (err) {
      console.log(err);
      return rejectWithValue('Дополнения к заказу не найдены');
   }
});
