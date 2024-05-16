import { rtkApi } from '@/shared/api/rtkApi';
import { UpdateUserData, type UserData } from '../model/types/user';
import { type UserSettings } from '../model/types/userSettings';

// 15_5 8min пользовательские json настройки

interface SetUserSettingsArg {
   userId: string;
   userSettings: UserSettings;
}

interface SetUpdateUserDataArg {
   userId: string;
   updateData: UpdateUserData;
}

const userApi = rtkApi.injectEndpoints({
   endpoints: (build) => ({
      setUpdateUserData: build.mutation<UserData, SetUpdateUserDataArg>({
         query: ({ userId, updateData }) => ({
            url: `/users/${userId}`,

            method: 'PATCH',
            body: updateData,
         }),
      }),
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

export const setUpdateUserDataMutation =
   userApi.endpoints.setUpdateUserData.initiate;

export const setUserSettingsMutation =
   userApi.endpoints.setUserSettings.initiate;

export const getUserDataByIdQuery = userApi.endpoints.getUserDataById.initiate;
