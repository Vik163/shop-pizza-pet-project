import { createAsyncThunk } from '@reduxjs/toolkit';
import { type ThunkConfig } from '@/app/providers/StoreProvider';
import { type UserParameters } from '../types/userParameters';
import { getUserData } from '../selectors/userDataSelector';
import { getUserParameters } from '../selectors/userParameters';
import { setUserParametersMutation } from '../../api/userApi';

// устанавливает доп параметры пользователя ()
// extraReducers (userSlice)
export const saveUserParameters = createAsyncThunk<
   UserParameters,
   UserParameters,
   ThunkConfig<string>
>('user/saveUserParameters', async (newUserParameters, thunkApi) => {
   const { rejectWithValue, getState, dispatch } = thunkApi;
   const userData = getUserData(getState());
   const currentParameters = getUserParameters(getState());

   if (!userData) {
      return rejectWithValue('');
   }

   // rtkQuery
   try {
      const response = await dispatch(
         setUserParametersMutation({
            userId: userData._id,
            userParameters: {
               ...currentParameters,
               ...newUserParameters,
            },
         }),
      ).unwrap();

      if (!response.userParameters) {
         return rejectWithValue('');
      }

      return response.userParameters;
   } catch (e) {
      console.log(e);
      return rejectWithValue('');
   }
});
