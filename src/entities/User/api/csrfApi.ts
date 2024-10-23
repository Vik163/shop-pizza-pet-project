import { rtkApi } from '@/shared/api/rtkApi';

const userApi = rtkApi.injectEndpoints({
   endpoints: (build) => ({
      setCsrfData: build.query<string, void>({
         query: () => ({
            url: '/csrf',
            method: 'GET',
            responseHandler: (response) => response.text(), // переопределяет чтение полученного файла не как json, а как text
         }),
      }),
   }),
});

export const setCsrfToken = userApi.endpoints.setCsrfData.initiate;
