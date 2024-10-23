import { rtkApi } from '@/shared/api/rtkApi';
import { ProductSchema } from '../model/types/productSchema';

interface ParamsProps {
   _expand: string;
   view: string;
   _limit: number;
   _page: number | undefined;
   _replace: string | undefined;
}

const productApi = rtkApi.injectEndpoints({
   endpoints: (build) => ({
      getProducts: build.query<ProductSchema, ParamsProps>({
         query: (params) => ({
            url: '/products',
            method: 'GET',
            params,
         }),
      }),
   }),
});

export const getProducts = productApi.endpoints.getProducts.initiate;
