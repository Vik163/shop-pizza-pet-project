import { rtkApi, rtkApiTokens } from '@/shared/api/rtkApi';
import { UpdateUserData, type UserData } from '../model/types/user';
import { type UserSettings } from '../model/types/userSettings';

interface UserSignUp {
   user: { phoneNumber: string | null };
   csrf: string;
}

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
      signUpUser: build.query<UserData, UserSignUp>({
         query: ({ user, csrf }) => ({
            url: '/firebase',
            method: 'POST',
            headers: { 'x-csrf-token': csrf },
            body: user,
         }),
      }),
      getUserDataById: build.query<UserData, string>({
         query: (userId) => ({
            url: `/auth/${userId}`,
            method: 'GET',
         }),
      }),
      logout: build.query<Response, void>({
         query: () => ({
            url: '/signout',
            method: 'GET',
            // validateStatus: (response) => response.status === 200,
         }),
      }),
   }),
});

const userApiTokens = rtkApiTokens.injectEndpoints({
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
   }),
});

export const signUpUser = userApi.endpoints.signUpUser.initiate;

export const setUpdateUserDataMutation =
   userApiTokens.endpoints.setUpdateUserData.initiate;

export const setUserSettingsMutation =
   userApiTokens.endpoints.setUserSettings.initiate;

export const getUserDataByIdQuery = userApi.endpoints.getUserDataById.initiate;

export const userLogout = userApi.endpoints.logout.initiate;
