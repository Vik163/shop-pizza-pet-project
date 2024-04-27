import { StateSchema } from '@/app/providers/StoreProvider';
import { paginateElements } from '@/shared/const/paginate_elements';

export const getViewProducts = (state: StateSchema) =>
   state.product.view || 'pizzas';
export const getLimitProducts = (state: StateSchema) =>
   state.product.limit || paginateElements;
export const getPageProductsNum = (state: StateSchema) =>
   state.product.page || 1;
export const getPageHasMore = (state: StateSchema) => state.product?.hasMore;
export const getTotalProducts = (state: StateSchema) =>
   state.product.totalItems;
export const getIsLoadingProducts = (state: StateSchema) =>
   state.product.isLoadingProducts;
