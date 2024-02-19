import axios from 'axios';

export const fetchCsrfToken = async (): Promise<string | undefined> => {
   try {
      const token = await axios.get('https://pizzashop163.ru/api/csrf');

      const csrfToken: string = token.data;

      if (csrfToken) return csrfToken;

      return 'csrf не получен';
   } catch (err) {
      console.log(err);
      return 'csrf не получен';
   }
};
