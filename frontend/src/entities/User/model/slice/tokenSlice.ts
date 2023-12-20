import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TokenSchema } from '../types/token';

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
