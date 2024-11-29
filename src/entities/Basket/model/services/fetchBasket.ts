import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { BasketData } from '../types/basket';
import { getBasket } from '../../api/basketApi';

export const fetchBasket = createAsyncThunk<
   BasketData,
   string,
   ThunkConfig<string>
>('orderProducts/fetchBasket', async (id, thunkApi) => {
   const { rejectWithValue, dispatch } = thunkApi;

   try {
      const basket = await dispatch(getBasket(id)).unwrap();

      if (!basket) return rejectWithValue('Корзина не найдена');

      return basket;
   } catch (err) {
      const errData = err as Error;
      return rejectWithValue(errData.message || 'Корзина не найдена');
   }
});
