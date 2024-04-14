import { createAsyncThunk } from '@reduxjs/toolkit';
import { Additives } from '../types/additives';
import { type ThunkConfig } from '@/app/providers/StoreProvider';

export const fetchAdditives = createAsyncThunk<
   Additives[],
   void,
   ThunkConfig<string>
>('orderProducts/fetchAdditives', async (_, thunkApi) => {
   const { extra, rejectWithValue } = thunkApi;

   try {
      const additivesData = await extra.api.get<Additives[]>(
         '/products/additives',
      );

      if (!additivesData.data) rejectWithValue('Добавки не найдены');

      return additivesData.data;
   } catch (e) {
      console.log(e);
      return rejectWithValue('Добавки не найдены');
   }
});
