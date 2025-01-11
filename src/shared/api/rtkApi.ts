import {
   BaseQueryFn,
   createApi,
   FetchArgs,
   fetchBaseQuery,
   FetchBaseQueryError,
   FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react';
import { jwtDecode } from 'jwt-decode';
import dayjs from 'dayjs';
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { useCookie } from '../lib/hooks/useCookie';
import { StateSchema } from '@/app/providers/StoreProvider';
import { LOCALSTORAGE_USER_KEY } from '../const/localstorage';

// eslint-disable-next-line react-hooks/rules-of-hooks
const { getCookie } = useCookie();

// Добавить в store api  и типы в схему

const checkToken = async () => {
   const token = getCookie('accessToken');
   const user = token && jwtDecode(token);
   const isExpired = user && user.exp && dayjs.unix(user.exp).diff(dayjs()) < 1;
   return isExpired;
};

const openPageError = (error: string) => {
   localStorage.setItem('error', error);

   document.location.href = '*'; // window.location.href работал не корректно
};

//* type ResponseHandler ===
//  | 'content-type'
//  | 'json'
//  | 'text'
//  | ((response: Response) => Promise<any>)
// Значения "json" и "text" указывают fetchBaseQuery на соответствующие методы ответа на выборку для чтения текста.
// content-type сначала проверяет поле заголовка, чтобы определить, является ли это JSON, а затем использует один из этих двух методов.
// Обратный вызов позволяет вам самостоятельно обработать тело
const baseQuery = fetchBaseQuery({
   baseUrl: __API__,
   responseHandler: 'content-type', //* ====
   prepareHeaders: async (headers, { getState }) => {
      const csrf = (getState() as StateSchema).csrfToken._csrfToken;
      const token = getCookie('accessToken');
      if (token) {
         headers.set('Authorization', `Bearer ${token}`);
      }
      if (csrf) {
         headers.set('x-csrf-token', csrf);
      }

      return headers;
   },
});

const baseQueryWithError: BaseQueryFn<
   string | FetchArgs,
   unknown,
   FetchBaseQueryError
> = async (args, api, extraOptions) => {
   let result: QueryReturnValue<
      unknown,
      FetchBaseQueryError,
      FetchBaseQueryMeta
   >;
   const userId = localStorage.getItem(LOCALSTORAGE_USER_KEY);
   const isExpired = await checkToken();

   if (isExpired) {
      const refreshResult = await baseQuery(
         `/refresh/${userId}`,
         api,
         extraOptions,
      );
      if (refreshResult.data) {
         result = await baseQuery(args, api, extraOptions); // повторный запрос
         return result;
      }
      openPageError('Ошибка авторизации');

      return refreshResult;
   }
   result = await baseQuery(args, api, extraOptions); // повторный запрос

   // Ошибка запроса
   // if (result.error && result.error.status === 401) {
   //    openPageError('Не авторизован');
   // }
   return result;
};

export const rtkApiTokens = createApi({
   reducerPath: 'apiTokens',
   baseQuery: baseQueryWithError,
   endpoints: () => ({}),
});
