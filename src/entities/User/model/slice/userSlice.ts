/* eslint-disable no-param-reassign */
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { type UserSchema, type UserData } from '../types/user';
import { type UserSettings } from '../types/userSettings';
import { saveUserSettings } from '../services/saveUserSettings';
import { initAuthData } from '../services/initAuthData';
import { LOCALSTORAGE_USER_KEY } from '@/shared/const/localstorage';
import { updateUserData } from '../services/updateUserData';
import { fetchSignupUser } from '../services/fetchSignupUser';

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
         state.authData = payload;
         state._inited = true;
         localStorage.setItem(LOCALSTORAGE_USER_KEY, payload.userId);
      },
      logout: (state) => {
         state._inited = false;
         localStorage.removeItem(LOCALSTORAGE_USER_KEY);
      },
      setError: (state, { payload }: PayloadAction<string>) => {
         state.error = payload;
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchSignupUser.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(
            fetchSignupUser.fulfilled,
            (state, { payload }: PayloadAction<UserData>) => {
               state.isLoading = false;
               state.authData = payload;
               state._inited = true;
               localStorage.setItem(LOCALSTORAGE_USER_KEY, payload.userId);
            },
         )
         .addCase(fetchSignupUser.rejected, (state, { payload }) => {
            state.isLoading = false;
            state.error = payload as string;
         })

         .addCase(
            initAuthData.fulfilled, // текущий пользователь (App)
            (state, { payload }: PayloadAction<UserData>) => {
               state.authData = payload;
               state._inited = true;
            },
         )
         .addCase(initAuthData.rejected, (state, action) => {
            state._inited = false;
            if (action.payload) {
               // Being that we passed in ValidationErrors to rejectType in `createAsyncThunk`, the payload will be available here.
               state.error = action.payload.errorMessage;
            } else {
               state.error = action.error.message;
            }
         })
         .addCase(
            saveUserSettings.fulfilled, // дополнительные параметры user (какой-то)
            (state, { payload }: PayloadAction<UserSettings>) => {
               if (state.authData) {
                  state.authData.userSettings = payload;
               }
            },
         )
         .addCase(
            saveUserSettings.rejected, // дополнительные параметры user (какой-то)
            (state, { payload }) => {
               state.error = payload;
            },
         )
         .addCase(
            updateUserData.fulfilled, // дополнительные параметры user (какой-то)
            (state, { payload }: PayloadAction<UserData>) => {
               if (state.authData) {
                  state.authData = payload;
               }
            },
         )
         .addCase(
            updateUserData.rejected, // дополнительные параметры user (какой-то)
            (state, { payload }) => {
               state.error = payload;
            },
         );
   },
});

export const { actions: userAction } = userSlice;
export const { reducer: userReducer } = userSlice;
