import { createAsyncThunk } from '@reduxjs/toolkit';
import { type AxiosError } from 'axios';
import { type UserData, type ValidationErrors } from '../types/user';
import { type ThunkConfig } from '@/app/providers/StoreProvider';
import { fetchCsrfToken } from './fetchCsrfToken';
import { getUserDataByIdQuery } from '../../api/userApi';

// Запрос на текущего пользователя по id из localStorage
// через extraReducers (userSlice)

export const initAuthData = createAsyncThunk<
   UserData,
   string,
   ThunkConfig<ValidationErrors>
>('user/initAuthData', async (userId, thunkApi) => {
   const { rejectWithValue, dispatch } = thunkApi;

   try {
      if (!userId) {
         return rejectWithValue({
            errorMessage: 'Пользователь не авторизован',
         });
      }

      const userData = await dispatch(getUserDataByIdQuery(userId)).unwrap();

      if (!userData.phoneNumber) {
         return rejectWithValue({
            errorMessage: 'Пользователь не авторизован',
         });
      }

      const csrfToken = await dispatch(fetchCsrfToken());

      if (!csrfToken) {
         return rejectWithValue({ errorMessage: 'токен csrf не получен' });
      }

      return userData;
   } catch (err) {
      const error = err as AxiosError<ValidationErrors>;
      if (!error.response?.statusText) {
         throw err;
      }
      return rejectWithValue(error.response.data);
   }
});
