import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { type AxiosError } from 'axios';
import { type UserData, type ValidationErrors } from '../types/user';
import { type ThunkConfig } from '@/app/providers/StoreProvider';

// Запрос на текущего пользователя по id из localStorage
// через extraReducers (userSlice)

export const initAuthData = createAsyncThunk<
   UserData,
   string,
   ThunkConfig<ValidationErrors>
>('user/initAuthData', async (userId, thunkApi) => {
   const { rejectWithValue } = thunkApi;
   try {
      if (!userId) {
         return rejectWithValue({
            errorMessage: 'Пользователь не авторизован',
         });
      }

      const response = (
         await axios.get(`https://pizzashop163.ru/api/auth/${userId}`, {
            withCredentials: true,
         })
      ).data;

      if (response.message === 'Пользователь не найден') {
         return rejectWithValue({ errorMessage: 'Пользователь не найден' });
      }

      // const csrfToken = await fetchCsrfToken();

      // if (csrfToken === 'csrf не получен') {
      //    return rejectWithValue({ errorMessage: 'токен csrf не получен' });
      // }
      // if (csrfToken) {
      //    dispatch(csrfTokenActions.setToken(csrfToken));
      // }

      console.log(response);
      return response;
   } catch (err) {
      const error = err as AxiosError<ValidationErrors>;
      if (!error.response) {
         throw err;
      }
      return rejectWithValue(error.response.data);
   }
});
