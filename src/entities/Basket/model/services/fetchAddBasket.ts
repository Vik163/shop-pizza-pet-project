import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { BasketData, BasketOneProduct } from '../types/basket';
import { LOCALSTORAGE_USER_KEY } from '@/shared/const/localstorage';
import { setBasketAddDataMutation } from '../../api/basketApi';

export const fetchAddBasket = createAsyncThunk<
   BasketData,
   BasketOneProduct,
   ThunkConfig<string>
>('orderProducts/fetchAddBasket', async (order, thunkApi) => {
   const { rejectWithValue, dispatch } = thunkApi;

   const userId = localStorage.getItem(LOCALSTORAGE_USER_KEY) || '';
   try {
      const basket = await dispatch(
         setBasketAddDataMutation({
            userId,
            order,
         }),
      ).unwrap();

      return basket;
   } catch (err) {
      console.log(err);

      return rejectWithValue('Товары в корзине не обновились');
   }
});
