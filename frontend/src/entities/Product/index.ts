export type {
   Product,
   ProductFixPrice,
   IngredientsView,
   ProductShema,
   Products,
} from './model/types/product';
export type { ActionCards } from './model/types/actions';

export { productActions, productReducer } from './model/slice/productsSlice';
// export {
//    getErrorProducts,
//    getLoadingProducts,
//    getProducts,
// } from './model/selectors/productSelector';
export { fetchProductsList } from './model/services/fetchInitProducts/fetchInitProducts';
export {
   ProductView,
   ProductType,
   ProductSortField,
} from './model/consts/productConst';
