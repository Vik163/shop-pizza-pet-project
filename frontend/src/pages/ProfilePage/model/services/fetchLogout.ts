import { $api } from '@/shared/api/api';

export const fetchLogoutUser = () => {
   return $api
      .get('/signout')
      .then((data) => {
         return data.status === 200 ? true : false;
      })
      .catch((err) => {
         console.log('Не удален пользователь из БД', err);
      });
};
