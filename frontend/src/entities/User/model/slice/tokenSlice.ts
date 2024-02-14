/* eslint-disable no-param-reassign */
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { type TokenSchema } from '../types/token';

const initialState: TokenSchema = {
   _csrfToken: '',
};

const csrfTokenSlice = createSlice({
   name: 'csrfToken',
   initialState,
   reducers: {
      setToken: (state, { payload }: PayloadAction<string>) => {
         state._csrfToken = payload;
      },
   },
});

export const { actions: csrfTokenActions } = csrfTokenSlice;
export const { reducer: csrfTokenReducer } = csrfTokenSlice;
