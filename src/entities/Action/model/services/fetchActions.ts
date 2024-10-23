import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Action } from '../types/actions';
import { setActions } from '../../api/actionsApi';

export const fetchActions = createAsyncThunk<
   Action[],
   void,
   ThunkConfig<string>
>('product/fetchActions', async (_, thunkApi) => {
   const { rejectWithValue, dispatch } = thunkApi;

   try {
      const actions = await dispatch(setActions()).unwrap();
      if (!actions) {
         return rejectWithValue('Акции не найдены');
      }

      return actions;
   } catch (e) {
      return rejectWithValue('error');
   }
});
