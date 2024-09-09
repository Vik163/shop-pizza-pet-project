import axios from 'axios';
import { host } from '@/shared/api/api';

export const fetchCsrfToken = async (): Promise<string | undefined> => {
   try {
      const token = await axios.get(`${host}/csrf`);

      const csrfToken: string = token.data;

      if (csrfToken) return csrfToken;

      return 'csrf не получен';
   } catch (err) {
      console.log(err);
      return 'csrf не получен';
   }
};
