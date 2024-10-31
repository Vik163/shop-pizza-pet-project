import { createAsyncThunk } from '@reduxjs/toolkit';
import { type User } from 'firebase/auth';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { fetchCsrfToken } from './fetchCsrfToken';
import { UserData } from '../types/user';
import { signUpUser } from '../../api/userApi';

export const fetchSignupUser = createAsyncThunk<
   UserData,
   User,
   ThunkConfig<string>
>('user/fetchSignupUser', async (user, thunkApi) => {
   const { rejectWithValue, dispatch } = thunkApi;
   try {
      const csrfToken = await dispatch(fetchCsrfToken()).unwrap();

      if (!csrfToken) {
         return rejectWithValue('токен csrf не получен');
      }

      const data = {
         phoneNumber: user.phoneNumber,
         // role: 'CLIENT', //! ?
      };

      const userData = await dispatch(
         signUpUser({ user: data, csrf: csrfToken }),
      ).unwrap();

      return userData;
   } catch (e) {
      console.log(e);
      return rejectWithValue('Некоректная регистрация пользователя');
   }
});
