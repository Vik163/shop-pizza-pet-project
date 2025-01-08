import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { $api } from '@/shared/api/axiosApi';

export const fetchCsrfToken = createAsyncThunk<
   string,
   void,
   ThunkConfig<string>
>('csrfToken/fetchCsrfToken', async (_, thunkApi) => {
   const { rejectWithValue } = thunkApi;

   try {
      const csrfToken = (await $api.get('/csrf')).data;

      if (!csrfToken) return rejectWithValue('csrf не получен');

      return csrfToken;
   } catch (err) {
      console.log(err);
      return rejectWithValue('csrf не получен');
   }
});
