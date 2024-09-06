/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
   IAdditives,
   AdditivesSchema,
   AdditivesSelect,
} from '../types/additives';
import { fetchAdditives } from '../services/fetchAddivites';

const initialState: AdditivesSchema = {
   additives: [],
   isLoading: false,
   error: '',
   additivesSelect: undefined,
};

const additivesSlice = createSlice({
   name: 'additives',
   initialState,
   reducers: {
      additivesSelect: (state, { payload }: PayloadAction<AdditivesSelect>) => {
         state.additivesSelect = payload;
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchAdditives.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(
            fetchAdditives.fulfilled,
            (state, { payload }: PayloadAction<IAdditives[]>) => {
               state.isLoading = false;
               state.additives = payload;
            },
         )
         .addCase(fetchAdditives.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
         });
   },
});

export const { actions: additivesActions } = additivesSlice;
export const { reducer: additivesReducer } = additivesSlice;
