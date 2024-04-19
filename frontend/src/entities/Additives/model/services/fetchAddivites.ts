import { createAsyncThunk } from '@reduxjs/toolkit';
import { IAdditives } from '../types/additives';
import { type ThunkConfig } from '@/app/providers/StoreProvider';

export const fetchAdditives = createAsyncThunk<
   IAdditives[],
   void,
   ThunkConfig<string>
>('orderProducts/fetchAdditives', async (_, thunkApi) => {
   const { extra, rejectWithValue } = thunkApi;

   try {
      const additivesData = await extra.api.get<IAdditives[]>(
         '/products/additives',
      );

      if (!additivesData.data) rejectWithValue('Добавки не найдены');

      return additivesData.data;
   } catch (e) {
      console.log(e);
      return rejectWithValue('Добавки не найдены');
   }
});
