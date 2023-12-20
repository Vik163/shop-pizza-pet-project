import { $api } from '@/shared/api/api';

export const fetchLogout = async () => {
   const data = $api.delete('/auth');

   return (await data).status;
};
