import { rtkApi } from '@/shared/api/rtkApi';
import { IAdditives } from '../model/types/additives';

const additivesApi = rtkApi.injectEndpoints({
   endpoints: (build) => ({
      getAdditivesToProducts: build.query<IAdditives[], void>({
         query: () => ({
            url: '/products/additives',
            method: 'GET',
         }),
      }),
   }),
});

export const getAdditivesToProducts =
   additivesApi.endpoints.getAdditivesToProducts.initiate;
