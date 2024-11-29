import { createAsyncThunk } from '@reduxjs/toolkit';
// import { type AxiosError } from 'axios';
import { type UserData } from '../types/user';
import { type ThunkConfig } from '@/app/providers/StoreProvider';
import { fetchCsrfToken } from './fetchCsrfToken';
import { getUserDataByIdQuery } from '../../api/userApi';

// Запрос на текущего пользователя по id из localStorage
// через extraReducers (userSlice)

export const initAuthData = createAsyncThunk<
   UserData,
   string,
   ThunkConfig<string>
>('user/initAuthData', async (userId, thunkApi) => {
   const { rejectWithValue, dispatch } = thunkApi;

   try {
      if (!userId) {
         return rejectWithValue('Пользователь не авторизован');
      }

      const userData = await dispatch(getUserDataByIdQuery(userId)).unwrap();

      if (!userData.phoneNumber) {
         return rejectWithValue('Пользователь не авторизован');
      }

      const csrfToken = await dispatch(fetchCsrfToken());

      if (!csrfToken) {
         return rejectWithValue('токен csrf не получен');
      }

      return userData;
   } catch (err) {
      const error = err as Error;
      if (!error.message) {
         throw err;
      }
      return rejectWithValue(error.message);
   }
});
