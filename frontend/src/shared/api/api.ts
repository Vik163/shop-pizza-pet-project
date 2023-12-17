import axios from 'axios';
import { useCookie } from '../lib/hooks/useCookie/useCookie';

//! useSelector - падает ошибка

const { getCookie } = useCookie();
// const baseURL = __IS_DEV__ ? 'http://localhost:8000' : 'адрес сервера'; - проще
// правильнее apiUrl = env.apiUrl || 'http://localhost:8000' - webpack.config

export const $api = axios.create({
   baseURL: __API__, // правильнее
   withCredentials: true,
});

$api.interceptors.request.use(async (config) => {
   if (config.headers) {
      config.headers.authorization = getCookie('accessToken');
   }
   return config;
});
