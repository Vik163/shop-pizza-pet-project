/* eslint-disable no-param-reassign */
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { type TokenSchema } from '../types/token';
import { fetchCsrfToken } from '../services/fetchCsrfToken';

const initialState: TokenSchema = {
   _csrfToken: '',
};

const csrfTokenSlice = createSlice({
   name: 'csrfToken',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(
            fetchCsrfToken.fulfilled,
            (state, { payload }: PayloadAction<string>) => {
               state._csrfToken = payload;
            },
         )
         .addCase(fetchCsrfToken.rejected, (state, { payload }) => {
            state.errorMessage = payload;
         });
   },
});

export const { actions: csrfTokenActions } = csrfTokenSlice;
export const { reducer: csrfTokenReducer } = csrfTokenSlice;
