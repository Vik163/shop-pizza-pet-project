import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ScrollSaveSchema } from '../types/scrollSaveSchema';

const initialState: ScrollSaveSchema = {
   scroll: {},
};

// 9_2
export const scrollSaveSlice = createSlice({
   name: 'scrollSave',
   initialState,
   reducers: {
      setScrollPosition: (
         state,
         { payload }: PayloadAction<{ path: string; position: number }>,
      ) => {
         state.scroll = { ...state.scroll, [payload.path]: payload.position };
      },
   },
});

export const { actions: scrollSaveActions } = scrollSaveSlice;
export const { reducer: scrollSaveReducer } = scrollSaveSlice;
