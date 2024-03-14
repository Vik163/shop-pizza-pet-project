import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { jwtDecode } from 'jwt-decode';
import dayjs from 'dayjs';
import axios from 'axios';
import { useCookie } from '../lib/hooks/useCookie/useCookie';
import { StateSchema } from '@/app/providers/StoreProvider';
import { LOCALSTORAGE_USER_KEY } from '../const/localstorage';

// eslint-disable-next-line react-hooks/rules-of-hooks
const { getCookie } = useCookie();

export const rtkApi = createApi({
   reducerPath: 'api',
   baseQuery: fetchBaseQuery({
      baseUrl: __API__,
      prepareHeaders: async (headers, { getState }) => {
         const csrf = (getState() as StateSchema).csrfToken._csrfToken;
         const token = getCookie('accessToken');
         if (token) {
            headers.set('Authorization', `Bearer ${token}`);
         }
         if (csrf) {
            headers.set('x-csrf-token', csrf);
         }

         // два пакета чтобы определить годность токена
         const user = token && jwtDecode(token);
         const isExpired =
            user && user.exp && dayjs.unix(user.exp).diff(dayjs()) < 1;
         if (!isExpired) return headers;

         const userId = localStorage.getItem(LOCALSTORAGE_USER_KEY);

         const response = await axios.get(
            `https://pizzashop163.ru/api/refresh/${userId}`,
         );

         if (!(response.status === 200))
            throw Error('Не обновлены токены безопасности');

         headers.set('Authorization', `Bearer ${getCookie('accessToken')}`);

         return headers;
      },
      credentials: 'include',
   }),
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   endpoints: (builder) => ({}),
});
