import { createAsyncThunk } from '@reduxjs/toolkit';
import { UpdateUserData, UserData } from '../types/user';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { setUpdateUserDataMutation } from '../../api/userApi';
import { LOCALSTORAGE_USER_KEY } from '@/shared/const/localstorage';

export const updateUserData = createAsyncThunk<
   UserData,
   UpdateUserData,
   ThunkConfig<string>
>('user/updateUserData', async (newData, thunkApi) => {
   const { rejectWithValue, dispatch } = thunkApi;

   // rtkQuery
   try {
      const userId = localStorage.getItem(LOCALSTORAGE_USER_KEY);

      if (!userId) {
         return rejectWithValue('ID пользователя не найден');
      }

      const response = await dispatch(
         setUpdateUserDataMutation({
            userId,
            // объединяет текуций объект и объект с новыми данными
            updateData: newData,
         }),
      ).unwrap();

      if (!response) {
         return rejectWithValue('');
      }

      return response;
   } catch (e) {
      console.log(e);
      return rejectWithValue('');
   }
});
