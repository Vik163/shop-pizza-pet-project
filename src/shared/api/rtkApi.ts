import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { jwtDecode } from 'jwt-decode';
import dayjs from 'dayjs';
import axios from 'axios';
import { useCookie } from '../lib/hooks/useCookie';
import { StateSchema } from '@/app/providers/StoreProvider';
import { LOCALSTORAGE_USER_KEY } from '../const/localstorage';
import { host } from '../const/host';

// eslint-disable-next-line react-hooks/rules-of-hooks
const { getCookie } = useCookie();

// Добавить в store обе api  и типы в схему
export const rtkApi = createApi({
   reducerPath: 'api', // Для каждого api должно быть свое имя (по умолчанию 'api')
   baseQuery: fetchBaseQuery({
      baseUrl: __API__,
   }),
   endpoints: () => ({}),
});

export const rtkApiTokens = createApi({
   reducerPath: 'apiTokens',
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

         const response = await axios.get(`${host}/refresh/${userId}`);

         if (!(response.status === 200))
            throw Error('Не обновлены токены безопасности');

         headers.set('Authorization', `Bearer ${getCookie('accessToken')}`);

         return headers;
      },
      credentials: 'include',
   }),
   endpoints: () => ({}),
});
