export type {
   Product,
   ProductFixPrice,
   IngredientsView,
   ViewsProducts,
   // ProductShema,
   // Products,
} from './model/types/product';

export { ProductItem } from './ui/ProductItem/ProductItem';
export { ProductsList } from './ui/ProductsList/ProductsList';

// export { productActions, productReducer } from './model/slice/productsSlice';
// // export {
// //    getErrorProducts,
// //    getLoadingProducts,
// //    getProducts,
// // } from './model/selectors/productSelector';
// export { fetchProductsList } from './model/services/fetchInitProducts/fetchInitProducts';
export {
   ProductViews,
   ProductType,
   ProductSortField,
} from './model/consts/productConst';
