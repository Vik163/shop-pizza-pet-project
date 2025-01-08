import { rtkApiTokens } from '@/shared/api/rtkApi';
import { UpdateUserData, type UserData } from '../model/types/user';
import { type UserSettings } from '../model/types/userSettings';

interface SetUserSettingsArg {
   userId: string;
   userSettings: UserSettings;
}

interface SetUpdateUserDataArg {
   userId: string;
   newData: UpdateUserData;
}

export const userApiTokens = rtkApiTokens.injectEndpoints({
   endpoints: (build) => ({
      getUserDataById: build.query<UserData, string>({
         query: (userId) => ({
            url: `/auth/${userId}`,
            method: 'GET',
         }),
      }),
      setUpdateUserData: build.mutation<UserData, SetUpdateUserDataArg>({
         query: ({ userId, newData }) => ({
            url: `/users/${userId}`,

            method: 'PATCH',
            body: newData,
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
   }),
});

export const {
   useGetUserDataByIdQuery,
   useSetUpdateUserDataMutation,
   useSetUserSettingsMutation,
} = userApiTokens;
