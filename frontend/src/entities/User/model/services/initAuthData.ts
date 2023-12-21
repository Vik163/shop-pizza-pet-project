import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserData } from '../types/user';
import { getUserDataByIdQuery } from '../../api/userApi';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { $api } from '@/shared/api/api';

// Запрос на текущего пользователя по id из localStorage
// через extraReducers (userSlice)
export const initAuthData = createAsyncThunk<
   UserData,
   string,
   ThunkConfig<string>
>('user/initAuthData', async (id, thunkApi) => {
   const { rejectWithValue, dispatch } = thunkApi;

   // const userId = localStorage.getItem('userId');

   if (!id) {
      return rejectWithValue('ErrorInitAuthData');
   }

   try {
      // посылаем запрос через rtk (userApi)
      const response = await dispatch(getUserDataByIdQuery(id)).unwrap();

      if (response.message === 'Пользователь не найден') {
         return rejectWithValue('Пользователь не найден');
      }

      console.log(response);
      return response;
   } catch (e) {
      console.log(e);
      return rejectWithValue('Некоректный запрос пользователя');
   }
});
