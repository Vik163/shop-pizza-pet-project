import { createAsyncThunk } from '@reduxjs/toolkit';
import { IAdditives } from '../types/additives';
import { type ThunkConfig } from '@/app/providers/StoreProvider';
import { $api } from '@/shared/api/axiosApi';

export const fetchAdditives = createAsyncThunk<
   IAdditives[],
   void,
   ThunkConfig<string>
>('orderProducts/fetchAdditives', async (_, thunkApi) => {
   const { rejectWithValue } = thunkApi;

   try {
      const additives = (await $api.get('/products/additives')).data;

      if (!additives) rejectWithValue('Добавки не найдены');

      return additives;
   } catch (e) {
      console.log(e);
      return rejectWithValue('Добавки не найдены');
   }
});
