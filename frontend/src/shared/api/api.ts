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
   const token = getCookie('accessToken');

   if (config.headers && token) {
      config.headers.authorization = `Bearer ${token}`;
   }
   return config;
});

// $api.interceptors.response.use(
//    function (response) {
//       // Любой код состояния, находящийся в диапазоне 2xx, вызывает срабатывание этой функции
//       // Здесь можете сделать что-нибудь с ответом
//       return response;
//    },
//    function (error) {
//       if (error.response.status === 401) {
//          $api.get('/refresh');
//       }
//       console.log('error:', error.response.status);
//       // Любые коды состояния, выходящие за пределы диапазона 2xx, вызывают срабатывание этой функции
//       // Здесь можете сделать что-то с ошибкой ответа
//       return Promise.reject(error);
//    },
// );
