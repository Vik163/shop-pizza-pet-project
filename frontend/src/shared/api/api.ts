import axios from 'axios';
import { useCookie } from '../lib/hooks/useCookie/useCookie';

const { getCookie } = useCookie();
// const baseURL = __IS_DEV__ ? 'http://localhost:8000' : 'адрес сервера'; - проще
// правильнее apiUrl = env.apiUrl || 'http://localhost:8000' - webpack.config

export const $api = axios.create({
   baseURL: __API__, // правильнее
   withCredentials: true,
});

export const $apiPostGuard = axios.create({
   baseURL: __API__, // правильнее
   withCredentials: true,
});

$api.interceptors.request.use(async (config) => {
   console.log(config);

   if (config.headers) {
      config.headers.authorization = getCookie('accessToken');
   }
   return config;
});

$apiPostGuard.interceptors.request.use(async (config) => {
   if (config.headers) {
      const csrfToken = getCookie('XSRF-TOKEN');
      config.headers['x-csrf-token'] = csrfToken ? csrfToken : '';
      config.headers.authorization = getCookie('accessToken');
   }
   return config;
});
