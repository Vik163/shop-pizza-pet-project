import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Action } from '../types/actions';
import { $api } from '@/shared/api/axiosApi';

export const fetchActions = createAsyncThunk<
   Action[],
   void,
   ThunkConfig<string>
>('product/fetchActions', async (_, thunkApi) => {
   const { rejectWithValue } = thunkApi;

   try {
      const actions = (await $api.get('/actions')).data;
      if (!actions) {
         return rejectWithValue('Акции не найдены');
      }

      return actions;
   } catch (e) {
      return rejectWithValue('error');
   }
});
