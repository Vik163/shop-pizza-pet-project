import axios from 'axios';

export const fetchLogoutUser = async (): Promise<boolean | void> => {
   return await axios
      .get('https://pizzashop163.ru/api/signout')
      .then((data) => {
         return data.status === 200;
      })
      .catch((err) => {
         console.log('Не удален пользователь из БД', err);
      });
};
