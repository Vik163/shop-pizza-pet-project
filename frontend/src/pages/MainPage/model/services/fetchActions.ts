import { createAsyncThunk } from '@reduxjs/toolkit';
// eslint-disable-next-line ulbi-tv-plugin/layer-imports
import { type ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';
import { ScrollingCards } from '@/features/HorizontalScrolling';

export const fetchActions = createAsyncThunk<
   ScrollingCards[],
   void,
   ThunkConfig<string>
>('product/fetchActions', async (_, thunkApi) => {
   const { extra, rejectWithValue } = thunkApi;

   try {
      const response = await extra.api.get<ScrollingCards[]>('/actions');
      if (!response.data) {
         rejectWithValue('Акции не найдены');
      }

      // console.log(response.data);
      return response.data;
   } catch (e) {
      return rejectWithValue('error');
   }
});
