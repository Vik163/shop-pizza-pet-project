import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { type UserSchema, type UserData } from '../types/user';
import { type UserParameters } from '../types/userParameters';
import { saveUserParameters } from '../services/saveUserParameters';
import { initAuthData } from '../services/initAuthData';

const initialState: UserSchema = {
   _inited: false,
   _userUid: '',
   error: undefined,
   authData: null
};

export const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      setAuthData: (state, { payload }: PayloadAction<UserData>) => {
         console.log(payload);
         state.authData = payload;
         state._inited = true;
         localStorage.setItem('userId', payload._id);
      },
      logout: (state) => {
         
         state._inited = false;
         localStorage.removeItem('userId');
      },
   },
   extraReducers: (builder) => {
      builder.addCase(
         saveUserParameters.fulfilled, // дополнительные параметры user (какой-то)
         (state, { payload }: PayloadAction<UserParameters>) => {
            if (state.authData) {
               state.authData.userParameters = payload;
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
