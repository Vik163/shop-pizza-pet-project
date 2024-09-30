import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ScrollSaveSchema, ScrollSchema } from '../types/scrollSaveSchema';

const initialState: ScrollSaveSchema = {
   scroll: {},
   direction: '',
};

// 9_2
export const scrollSaveSlice = createSlice({
   name: 'scrollSave',
   initialState,
   reducers: {
      setScrollPosition: (state, { payload }: PayloadAction<ScrollSchema>) => {
         state.scroll = {
            ...state.scroll,
            [payload.path]: {
               path: payload.path,
               position: payload.position,
            },
         };
      },
      setScrollDirection: (state, { payload }: PayloadAction<string>) => {
         state.direction = payload;
      },
   },
});

export const { actions: scrollSaveActions } = scrollSaveSlice;
export const { reducer: scrollSaveReducer } = scrollSaveSlice;
