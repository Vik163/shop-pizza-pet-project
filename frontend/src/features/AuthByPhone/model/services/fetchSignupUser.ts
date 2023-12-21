import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';

import { userAction } from '@/entities/User';
import { UserData } from '@/entities/User/model/types/user';
import { $api } from '@/shared/api/api';

export const fetchSignupUser = createAsyncThunk(
   'authByPhone/fetchSignup',
   async (user: User, thunkApi) => {
      const { rejectWithValue, dispatch } = thunkApi;
      console.log(user);

      try {
         const csrfToken = await $api.get('/csrf');
         const token = csrfToken.data.csrf;
         if (token) {
            const data = {
               phoneNumber: user.phoneNumber,
               role: 'ADMIN', //! ?
               _id: user.uid,
            };

            const authData = await $api.post<UserData>('/auth', data, {
               headers: { 'x-csrf-token': token },
            });

            const userData = authData.data;

            dispatch(userAction.setAuthData(userData));
            //! возвращать .data
            return authData.data;
         }
      } catch (e) {
         console.log(e);
         return rejectWithValue('Некоректная регистрация пользователя');
      }
   },
);
