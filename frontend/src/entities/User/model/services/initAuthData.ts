import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserData } from '../types/user';
import { getUserDataByIdQuery } from '../../api/userApi';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { $api } from '@/shared/api/api';
import { useCookie } from '@/shared/lib/hooks/useCookie/useCookie';
import axios from 'axios';
import { User } from 'firebase/auth';

// Запрос на текущего пользователя по id из localStorage
// через extraReducers (userSlice)
const { getCookie } = useCookie();

export const initAuthData = createAsyncThunk<
   UserData,
   User,
   ThunkConfig<string>
>('user/initAuthData', async (user, thunkApi) => {
   const { rejectWithValue, dispatch } = thunkApi;

   if (!user.uid) {
      return rejectWithValue('ErrorInitAuthData');
   }

   try {
      const token = await user.getIdToken();
      const response =
         token &&
         (
            await axios.get(`https://localhost:3001/auth/${user.uid}`, {
               headers: { authorization: token },
            })
         ).data;

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
