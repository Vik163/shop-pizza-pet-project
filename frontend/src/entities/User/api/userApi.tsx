import { rtkApi } from '@/shared/api/rtkApi';
import { UserData } from '../model/types/user';
import { UserParameters } from '../model/types/userParameters';
import { useCookie } from '@/shared/lib/hooks/useCookie/useCookie';
const { getCookie } = useCookie();

// 15_5 8min пользовательские json настройки
interface SetUserParametersArg {
   userId: string;
   userParameters: UserParameters;
}

// const csrfToken = getCookie('XSRF-TOKEN');

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
            // headers: { ['x-csrf-token']: csrfToken ? csrfToken : '' },
         }),
      }),
   }),
});

export const setUserParametersMutation =
   userApi.endpoints.setUserParameters.initiate;

export const getUserDataByIdQuery = userApi.endpoints.getUserDataById.initiate;
