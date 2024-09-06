import { createAsyncThunk } from '@reduxjs/toolkit';
import { type User } from 'firebase/auth';

import { csrfTokenActions, fetchCsrfToken, userAction } from '@/entities/User';
import { type UserData } from '@/entities/User';
import { $api } from '@/shared/api/api';

export const fetchSignupUser = createAsyncThunk(
   'authByPhone/fetchSignup',
   async (user: User, thunkApi) => {
      const { rejectWithValue, dispatch } = thunkApi;

      try {
         const csrfToken = await fetchCsrfToken();

         if (csrfToken === 'csrf не получен') {
            return rejectWithValue('токен csrf не получен');
         }

         if (csrfToken) {
            dispatch(csrfTokenActions.setToken(csrfToken));
            const data = {
               phoneNumber: user.phoneNumber,
               // role: 'CLIENT', //! ?
            };

            const authData = await $api.post<UserData>('/firebase', data, {
               headers: {
                  'x-csrf-token': csrfToken,
               },
               withCredentials: true,
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
