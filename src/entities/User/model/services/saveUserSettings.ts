import { createAsyncThunk } from '@reduxjs/toolkit';
import { type ThunkConfig } from '@/app/providers/StoreProvider';
import { type UserSettings } from '../types/userSettings';
import { getUserData } from '../selectors/userDataSelector';
import { getUserSettings } from '../selectors/userSettingsSelector';
import { setUserSettingsMutation } from '../../api/userApi';

// устанавливает доп параметры пользователя ()
// extraReducers (userSlice)
export const saveUserSettings = createAsyncThunk<
   UserSettings,
   UserSettings,
   ThunkConfig<string>
>('user/saveUserSettings', async (newUserSettings, thunkApi) => {
   const { rejectWithValue, getState, dispatch } = thunkApi;
   const userData = getUserData(getState());
   const currentSettings = getUserSettings(getState());

   if (!userData) {
      return rejectWithValue('');
   }

   // rtkQuery
   try {
      const response = await dispatch(
         setUserSettingsMutation({
            userId: userData.userId,
            // объединяет текуций объект и объект с новыми данными
            userSettings: {
               ...currentSettings,
               ...newUserSettings,
            },
         }),
      ).unwrap();

      if (!response.userSettings) {
         return rejectWithValue('');
      }

      return response.userSettings;
   } catch (e) {
      console.log(e);
      return rejectWithValue('');
   }
});
