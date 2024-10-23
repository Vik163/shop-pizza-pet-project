import { Product } from '@/entities/Product';
import { rtkApi } from '@/shared/api/rtkApi';

const productApi = rtkApi.injectEndpoints({
   endpoints: (build) => ({
      setPopularProducts: build.query<Product[], void>({
         query: () => ({
            url: '/products/popular',
            method: 'GET',
         }),
      }),
   }),
});

export const setPopularProducts =
   productApi.endpoints.setPopularProducts.initiate;
