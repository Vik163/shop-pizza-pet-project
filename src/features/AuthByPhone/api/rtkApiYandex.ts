import { rtkApi } from '@/shared/api/rtkApi';
import { host } from '@/shared/const/host';

const apiYandex = rtkApi.injectEndpoints({
   endpoints: (builder) => ({
      getYandex: builder.query<void, string>({
         query: (stateToken) => ({
            url: `${host}/yandex`,

            method: 'GET',
            headers: { 'x-yandex-state': stateToken },
         }),
      }),
   }),
});

export const fetchYandexId = apiYandex.endpoints.getYandex.initiate;
