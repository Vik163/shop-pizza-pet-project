import { StateSchema } from '@/app/providers/StoreProvider';

export const getViewProducts = (state: StateSchema) =>
   state.product.view || 'pizzas';

export const getIsLoadingProducts = (state: StateSchema) =>
   state.product.isLoadingProducts;
export const getPaginateProduct = (state: StateSchema) =>
   state.product.paginateProduct;
export const getSavePage = (state: StateSchema) => state.product.savePage;
export const getSaveScroll = (state: StateSchema) => state.product.saveScroll;
