import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserData } from '../types/user';
import { getUserDataByIdQuery } from '../../api/userApi';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { $api } from '@/shared/api/api';

// Запрос на текущего пользователя по id из localStorage
// через extraReducers (userSlice)
export const initAuthData = createAsyncThunk<
   UserData,
   void,
   ThunkConfig<string>
>('user/initAuthData', async (_, thunkApi) => {
   const { rejectWithValue, dispatch } = thunkApi;

   const userId = localStorage.getItem('userId');

   if (!userId) {
      return rejectWithValue('ErrorInitAuthData');
   }

   try {
      // посылаем запрос через rtk (userApi)
      const response = await dispatch(getUserDataByIdQuery(userId)).unwrap();

      console.log(response);
      return response;
   } catch (e) {
      console.log(e);
      return rejectWithValue('Некоректный запрос пользователя');
   }
});
