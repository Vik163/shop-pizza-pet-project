import { createAsyncThunk } from '@reduxjs/toolkit';
// eslint-disable-next-line ulbi-tv-plugin/layer-imports
import { type ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';
import { Action } from '../types/actions';

export const fetchActions = createAsyncThunk<
   Action[],
   void,
   ThunkConfig<string>
>('product/fetchActions', async (_, thunkApi) => {
   const { extra, rejectWithValue } = thunkApi;

   try {
      const response = await extra.api.get<Action[]>('/actions');
      if (!response.data) {
         rejectWithValue('Акции не найдены');
      }

      console.log(response.data);
      return response.data;
   } catch (e) {
      return rejectWithValue('error');
   }
});
