/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Additives, AdditivesSchema } from '../types/additives';
import { fetchAdditives } from '../services/fetchAddivites';

const initialState: AdditivesSchema = {
   additives: undefined,
   isLoading: false,
   error: '',
};

const additivesSlice = createSlice({
   name: 'additives',
   initialState,
   reducers: {
      //   setPhoneNumber: (state, { payload }: PayloadAction<additivesSchema>) => {
      //      state.phoneNumber = payload.phoneNumber;
      //   },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchAdditives.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(
            fetchAdditives.fulfilled,
            (state, { payload }: PayloadAction<Additives[]>) => {
               console.log('payload:', payload);
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
