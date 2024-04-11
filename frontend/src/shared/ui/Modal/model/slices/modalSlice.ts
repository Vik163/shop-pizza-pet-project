/* eslint-disable no-param-reassign */
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { type ModalSchema } from '../types/modal';

const initialState: ModalSchema = {
   //    phoneNumber: '',
   //    isLoading: false,
   //    error: '',
   isOpenPopup: false,
};

const modalSlice = createSlice({
   name: 'modal',
   initialState,
   reducers: {
      setIsOpenPopup: (state, { payload }: PayloadAction<boolean>) => {
         console.log('payload:', payload);
         state.isOpenPopup = payload;
      },
      //   setIsError: (state, { payload }: PayloadAction<string>) => {
      //      state.error = payload;
      //   },
   },
});

export const { actions: modalActions } = modalSlice;
export const { reducer: modalReducer } = modalSlice;
