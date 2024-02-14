import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { useCookie } from '../lib/hooks/useCookie/useCookie';

// eslint-disable-next-line react-hooks/rules-of-hooks
const { getCookie } = useCookie();

// 11_2
export const rtkApi = createApi({
   reducerPath: 'api',
   baseQuery: fetchBaseQuery({
      baseUrl: __API__,
      prepareHeaders: (headers) => {
         const token = getCookie('accessToken');
         if (token) {
            headers.set('Authorization', token);
         }
         return headers;
      },
      credentials: 'include',
   }),
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   endpoints: (builder) => ({}),
});
