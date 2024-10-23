import { createAsyncThunk } from '@reduxjs/toolkit';
import { BasketData } from '../types/basket';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { LOCALSTORAGE_USER_KEY } from '@/shared/const/localstorage';
import { setBasketDecreaseDataMutation } from '../../api/basketApi';

export const fetchDecreaseBasket = createAsyncThunk<
   BasketData,
   string,
   ThunkConfig<string>
>('basket/fetchDecreaseBasket', async (productId, thunkApi) => {
   const { rejectWithValue, dispatch } = thunkApi;
   try {
      const userId = localStorage.getItem(LOCALSTORAGE_USER_KEY) || '';

      const basket = await dispatch(
         setBasketDecreaseDataMutation({ userId, productId }),
      ).unwrap();

      if (!basket)
         rejectWithValue('Не удалось уменьшить количество товаров в корзине');

      return basket;
   } catch (err) {
      console.log(err);
      return rejectWithValue(
         'Не удалось уменьшить количество товаров в корзине',
      );
   }
});
