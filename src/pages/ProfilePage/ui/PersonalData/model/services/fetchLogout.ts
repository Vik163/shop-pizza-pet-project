import axios from 'axios';
import { host } from '@/shared/api/api';

export const fetchLogoutUser = async (): Promise<boolean | void> => {
   return axios
      .get(`${host}/signout`)
      .then((data) => {
         return data.status === 200;
      })
      .catch((err) => {
         console.log('Не удален пользователь из БД', err);
      });
};
