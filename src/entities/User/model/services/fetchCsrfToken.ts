import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { setCsrfToken } from '../../api/csrfApi';

export const fetchCsrfToken = createAsyncThunk<
   string,
   void,
   ThunkConfig<string>
>('csrfToken/fetchCsrfToken', async (_, thunkApi) => {
   const { rejectWithValue, dispatch } = thunkApi;

   try {
      const csrfToken = await dispatch(setCsrfToken()).unwrap();

      if (!csrfToken) return rejectWithValue('csrf не получен');

      return csrfToken;
   } catch (err) {
      console.log(err);
      return rejectWithValue('csrf не получен');
   }
});
