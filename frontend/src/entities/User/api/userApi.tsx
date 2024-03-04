import { rtkApi } from '@/shared/api/rtkApi';
import { type UserData } from '../model/types/user';
import { type UserSettings } from '../model/types/userSettings';

// 15_5 8min пользовательские json настройки
interface SetUserSettingsArg {
   userId: string;
   userSettings: UserSettings;
}

const userApi = rtkApi.injectEndpoints({
   endpoints: (build) => ({
      setUserSettings: build.mutation<UserData, SetUserSettingsArg>({
         query: ({ userId, userSettings }) => ({
            url: `/users/${userId}`,

            method: 'PATCH',
            body: {
               userSettings,
            },
         }),
      }),
      getUserDataById: build.query<UserData, string>({
         query: (userId) => ({
            url: `/auth/${userId}`,
            method: 'GET',
         }),
      }),
   }),
});

export const setUserSettingsMutation =
   userApi.endpoints.setUserSettings.initiate;

export const getUserDataByIdQuery = userApi.endpoints.getUserDataById.initiate;
