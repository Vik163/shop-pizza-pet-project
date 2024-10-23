import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { BasketData } from '../types/basket';
import { LOCALSTORAGE_USER_KEY } from '@/shared/const/localstorage';
import { setBasketDeleteDataMutation } from '../../api/basketApi';

export const fetchDelete = createAsyncThunk<
   BasketData,
   string,
   ThunkConfig<string>
>('basket/fetchDelete', async (productId, thunkApi) => {
   const { rejectWithValue, dispatch } = thunkApi;

   try {
      const userId = localStorage.getItem(LOCALSTORAGE_USER_KEY) || '';

      const basket = await dispatch(
         setBasketDeleteDataMutation({ userId, productId }),
      ).unwrap();

      if (!basket)
         return rejectWithValue('Не удалось удалить из корзины товар');

      return basket;
   } catch (err) {
      console.log(err);
      return rejectWithValue('Не удалось удалить из корзины товар');
   }
});
