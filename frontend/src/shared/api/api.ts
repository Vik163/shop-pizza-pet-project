import axios, { type InternalAxiosRequestConfig } from 'axios';
import { jwtDecode } from 'jwt-decode';
import dayjs from 'dayjs';
import { useCookie } from '../lib/hooks/useCookie/useCookie';

//! useSelector - падает ошибка

interface IRequest extends InternalAxiosRequestConfig {
   _isRetry?: boolean;
}

const { getCookie } = useCookie();
// const baseURL = __IS_DEV__ ? 'http://localhost:8000' : 'адрес сервера'; - проще
// правильнее apiUrl = env.apiUrl || 'http://localhost:8000' - webpack.config

export const $api = axios.create({
   baseURL: __API__, // правильнее
   withCredentials: true,
});

$api.interceptors.request.use(async (config: IRequest) => {
   const token = getCookie('accessToken');

   if (config.headers && token) {
      config.headers.authorization = `Bearer ${token}`;
   }

   // два пакета чтобы определить годность токена
   const user = token && jwtDecode(token);
   const isExpired = user && user.exp && dayjs.unix(user.exp).diff(dayjs()) < 1;

   const userId = localStorage.getItem('userId');

   if (!isExpired) return config;

   const response = await axios.get(
      `https://pizzashop163.ru/api/refresh/${userId}`,
   );

   if (!(response.status == 200))
      throw Error('Не обновлены токены безопасности');
   config.headers.authorization = `Bearer ${getCookie('accessToken')}`;
   return config;
});

// Работает, но:
// при обновлении токенов вылетала ошибка в консоли 401 (выбрасывалась в guard бекенд), не получилось ее перехватить
// пришлось установить два пакета, чтобы обновлять токены в переватчике запросов
// $api.interceptors.response.use(
//    (config) => {
//       return config;
//    },
//    async (error) => {
//       console.log('error:', error);
//       const originalRequest = error.config;
//       if (
//          error.response.status === 401 &&
//          error.config &&
//          !error.config._isRetry
//       ) {
//          originalRequest._isRetry = true;
//          const token = getCookie('accessToken');

//          const userId = localStorage.getItem('userId');
//          try {
//             userId &&
//                (await $api.get(`/refresh/${userId}`, {
//                   headers: { Authorization: `Bearer ${token}` },
//                }));
//             return $api.request(originalRequest);
//          } catch (err) {
//             console.log(err);
//          }
//       }
//    },
// );
