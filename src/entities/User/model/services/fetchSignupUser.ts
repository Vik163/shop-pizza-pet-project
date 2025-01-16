import { createAsyncThunk } from '@reduxjs/toolkit';
// import { type User } from 'firebase/auth';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { UserData } from '../types/user';
import { $api } from '@/shared/api/axiosApi';

export const fetchSignupUser = createAsyncThunk<
   UserData,
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   any,
   // User,
   ThunkConfig<string>
>('user/fetchSignupUser', async (user, thunkApi) => {
   const { rejectWithValue } = thunkApi;

   try {
      const csrfToken: string = (await $api.get('/csrf')).data;

      if (!csrfToken) {
         return rejectWithValue('токен csrf не получен');
      }

      const data = {
         phoneNumber: user.phoneNumber,
         // role: 'CLIENT', //! ?
      };
      const userData = await $api.post('/firebase', data, {
         headers: { 'x-csrf-token': csrfToken },
      });

      console.log('userData:', userData);
      return userData.data;
   } catch (e) {
      console.log(e);
      return rejectWithValue('Некоректная регистрация пользователя');
   }
});
