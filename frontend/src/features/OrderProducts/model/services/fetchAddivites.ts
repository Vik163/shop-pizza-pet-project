import { createAsyncThunk } from '@reduxjs/toolkit';
import { Additives } from '../types/additives';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { $api } from '@/shared/api/api';

export const fetchAdditives = createAsyncThunk<
   Additives[],
   void,
   ThunkConfig<string>
>('orderProducts/fetchAdditives', async (_, thunkApi) => {
   const { rejectWithValue } = thunkApi;

   try {
      const additivesData = await $api.get<Additives[]>('/products/additives');

      console.log('additivesData.data:', additivesData.data);
      return additivesData.data;
   } catch (e) {
      console.log(e);
      return rejectWithValue('Добавки не найдены');
   }
});
