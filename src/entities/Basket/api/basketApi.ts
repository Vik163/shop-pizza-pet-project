import { rtkApiTokens } from '@/shared/api/rtkApi';
import { BasketData, BasketOneProduct } from '../model/types/basket';

interface SetBasketAddArg {
   userId: string;
   order: BasketOneProduct;
}

interface SetBasketDecreaseArg {
   userId: string;
   productId: string;
}

const basketApi = rtkApiTokens.injectEndpoints({
   endpoints: (build) => ({
      getBasket: build.query<BasketData, string>({
         query: (userId) => ({
            url: `/users/${userId}/basket`,
            method: 'GET',
         }),
      }),
      setBasketAddData: build.mutation<BasketData, SetBasketAddArg>({
         query: ({ userId, order }) => ({
            url: `/users/${userId}/basket`,

            method: 'POST',
            body: order,
         }),
      }),
      setBasketDecreaseData: build.mutation<BasketData, SetBasketDecreaseArg>({
         query: ({ userId, productId }) => ({
            url: `/users/${userId}/basket/${productId}`,

            method: 'PUT',
         }),
      }),
      setBasketDeleteData: build.mutation<BasketData, SetBasketDecreaseArg>({
         query: ({ userId, productId }) => ({
            url: `/users/${userId}/basket/${productId}`,

            method: 'DELETE',
         }),
      }),
   }),
});

export const getBasket = basketApi.endpoints.getBasket.initiate;
export const setBasketAddDataMutation =
   basketApi.endpoints.setBasketAddData.initiate;
export const setBasketDecreaseDataMutation =
   basketApi.endpoints.setBasketDecreaseData.initiate;
export const setBasketDeleteDataMutation =
   basketApi.endpoints.setBasketDeleteData.initiate;
