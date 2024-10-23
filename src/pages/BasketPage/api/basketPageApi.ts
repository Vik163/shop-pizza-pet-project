import { Product } from '@/entities/Product';
import { rtkApi } from '@/shared/api/rtkApi';

const basketPageApi = rtkApi.injectEndpoints({
   endpoints: (build) => ({
      getAdditionalToOrder: build.query<Product[], void>({
         query: () => ({
            url: '/products/addition_order',
            method: 'GET',
         }),
      }),
   }),
});

export const getAdditionalToOrder =
   basketPageApi.endpoints.getAdditionalToOrder.initiate;
