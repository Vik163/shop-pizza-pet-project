import { createAsyncThunk } from '@reduxjs/toolkit';
import { IAdditives } from '../types/additives';
import { type ThunkConfig } from '@/app/providers/StoreProvider';
import { getAdditivesToProducts } from '../../api/additivesApi';

export const fetchAdditives = createAsyncThunk<
   IAdditives[],
   void,
   ThunkConfig<string>
>('orderProducts/fetchAdditives', async (_, thunkApi) => {
   const { rejectWithValue, dispatch } = thunkApi;

   try {
      const additives = await dispatch(getAdditivesToProducts()).unwrap();

      if (!additives) rejectWithValue('Добавки не найдены');

      return additives;
   } catch (e) {
      console.log(e);
      return rejectWithValue('Добавки не найдены');
   }
});
