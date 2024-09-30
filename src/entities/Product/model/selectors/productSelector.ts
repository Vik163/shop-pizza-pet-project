import { StateSchema } from '@/app/providers/StoreProvider';
import { paginateElements } from '@/shared/const/paginate_elements';

export const getViewProducts = (state: StateSchema) =>
   state.product.view || 'pizzas';
export const getLimitProducts = (state: StateSchema) =>
   state.product.limit || paginateElements;

export const getIsLoadingProducts = (state: StateSchema) =>
   state.product.isLoadingProducts;
export const getPaginateData = (state: StateSchema) =>
   state.product.paginateData;
