import { createAsyncThunk } from '@reduxjs/toolkit';
// eslint-disable-next-line ulbi-tv-plugin/layer-imports
import { type ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';
import { ActionCards } from '@/entities/Product';

export const fetchActions = createAsyncThunk<
   ActionCards[],
   void,
   ThunkConfig<string>
>('product/fetchActions', async (_, thunkApi) => {
   const { extra, rejectWithValue } = thunkApi;

   try {
      const response = await extra.api.get<ActionCards[]>('/actions');
      if (!response.data) {
         rejectWithValue('Акции не найдены');
      }

      // console.log(response.data);
      return response.data;
   } catch (e) {
      return rejectWithValue('error');
   }
});
