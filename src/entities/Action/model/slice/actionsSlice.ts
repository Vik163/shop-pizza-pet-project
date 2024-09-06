import { createSlice } from '@reduxjs/toolkit';
import { fetchActions } from '../../../../entities/Action/model/services/fetchActions';
import { ActionsSchema } from '../types/actionsSchema';

const initialStateActions: ActionsSchema = {
   isLoadingActions: false,
   error: undefined,
   actionItems: [],
};

const actionsSlice = createSlice({
   name: 'actionsSlice',
   initialState: initialStateActions,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchActions.pending, (state) => {
            state.error = undefined;
            state.isLoadingActions = true;
         })
         .addCase(fetchActions.fulfilled, (state, action) => {
            state.isLoadingActions = false;
            state.actionItems = action.payload;
         })
         .addCase(fetchActions.rejected, (state, action) => {
            state.isLoadingActions = false;
            state.error = action.payload;
         });
   },
});

export const { reducer: actionsReducer, actions: actionsActions } =
   actionsSlice;
