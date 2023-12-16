import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { useCookie } from '../lib/hooks/useCookie/useCookie';

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
   endpoints: (builder) => ({}),
});
