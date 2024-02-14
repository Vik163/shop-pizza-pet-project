import { rtkApi } from '@/shared/api/rtkApi';
import { type UserData } from '../model/types/user';
import { type UserParameters } from '../model/types/userParameters';

// 15_5 8min пользовательские json настройки
interface SetUserParametersArg {
   userId: string;
   userParameters: UserParameters;
}

const userApi = rtkApi.injectEndpoints({
   endpoints: (build) => ({
      setUserParameters: build.mutation<UserData, SetUserParametersArg>({
         query: ({ userId, userParameters }) => ({
            url: `/users/${userId}`,
            method: 'PATCH',
            body: {
               userParameters,
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

export const setUserParametersMutation =
   userApi.endpoints.setUserParameters.initiate;

export const getUserDataByIdQuery = userApi.endpoints.getUserDataById.initiate;
