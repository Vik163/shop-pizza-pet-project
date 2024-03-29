import { createAsyncThunk } from '@reduxjs/toolkit';
import { type AxiosError } from 'axios';
import { type UserData, type ValidationErrors } from '../types/user';
import { type ThunkConfig } from '@/app/providers/StoreProvider';
import { fetchCsrfToken } from './fetchCsrfToken';
import { csrfTokenActions } from '../slice/tokenSlice';
import { $api } from '@/shared/api/api';

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

      const response = await $api.get(`/auth/${userId}`, {
         withCredentials: true,
      });

      if (!response.data.phoneNumber) {
         return rejectWithValue({
            errorMessage: 'Пользователь не авторизован',
         });
      }
      const csrfToken = await fetchCsrfToken();

      if (csrfToken === 'csrf не получен') {
         return rejectWithValue({ errorMessage: 'токен csrf не получен' });
      }
      if (csrfToken) {
         dispatch(csrfTokenActions.setToken(csrfToken));
      }

      // console.log(response);
      return response.data;
   } catch (err) {
      const error = err as AxiosError<ValidationErrors>;
      if (!error.response?.statusText) {
         throw err;
      }
      return rejectWithValue(error.response.data);
   }
});
