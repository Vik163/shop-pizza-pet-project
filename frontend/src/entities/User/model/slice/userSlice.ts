/* eslint-disable no-param-reassign */
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { type UserSchema, type UserData } from '../types/user';
import { type UserSettings } from '../types/userSettings';
import { saveUserSettings } from '../services/saveUserSettings';
import { initAuthData } from '../services/initAuthData';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';

const initialState: UserSchema = {
   _inited: false,
   _userUid: '',
   error: undefined,
   authData: null,
};

export const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      setAuthData: (state, { payload }: PayloadAction<UserData>) => {
         console.log('setAuthData:', payload);
         state.authData = payload;
         state._inited = true;
         localStorage.setItem(USER_LOCALSTORAGE_KEY, payload._id);
      },
      logout: (state) => {
         state._inited = false;
         localStorage.removeItem(USER_LOCALSTORAGE_KEY);
      },
      setError: (state, { payload }: PayloadAction<string>) => {
         state.error = payload;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(
         saveUserSettings.fulfilled, // дополнительные параметры user (какой-то)
         (state, { payload }: PayloadAction<UserSettings>) => {
            if (state.authData) {
               state.authData.userSettings = payload;
            }
         },
      );
      builder.addCase(
         initAuthData.fulfilled, // текущий пользователь (App)
         (state, { payload }: PayloadAction<UserData>) => {
            state.authData = payload;
            state._inited = true;
         },
      );
      builder.addCase(initAuthData.rejected, (state, action) => {
         console.log('error:', action.error);
         console.log('payload:', action.payload);
         state._inited = false;
         if (action.payload) {
            // Being that we passed in ValidationErrors to rejectType in `createAsyncThunk`, the payload will be available here.
            state.error = action.payload.errorMessage;
         } else {
            state.error = action.error.message;
         }
      });
   },
});

export const { actions: userAction } = userSlice;
export const { reducer: userReducer } = userSlice;
