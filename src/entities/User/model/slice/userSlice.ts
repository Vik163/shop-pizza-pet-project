/* eslint-disable no-param-reassign */
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { type UserSchema, type UserData } from '../types/user';
import {
   LOCAL_STORAGE_VIEW_LOAD_KEY,
   LOCALSTORAGE_USER_KEY,
} from '@/shared/const/localstorage';
import { fetchSignupUser } from '../services/fetchSignupUser';
import { ViewLoad } from '@/shared/const/view_load';

const initialState: UserSchema = {
   _inited: false,
   _userUid: '',
   error: undefined,
   authData: null,
   loadProductMobile: ViewLoad.SCROLL,
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
      setLoadProductsMobile: (state, { payload }: PayloadAction<ViewLoad>) => {
         state.loadProductMobile = payload;
         localStorage.setItem(LOCAL_STORAGE_VIEW_LOAD_KEY, payload);
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
         });
   },
});

export const { actions: userAction } = userSlice;
export const { reducer: userReducer } = userSlice;
