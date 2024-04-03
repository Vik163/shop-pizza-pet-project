export type {
   Product,
   NewProducts,
   IngredientsView,
   ProductView,
} from './model/types/product';

export { ProductItem } from './ui/ProductItem/ProductItem';
export { ProductsList } from './ui/ProductsList/ProductsList';
export { NewProduct } from './ui/NewProduct/NewProduct';

// export { productActions, productReducer } from './model/slice/productsSlice';
// // export {
// //    getErrorProducts,
// //    getLoadingProducts,
// //    getProducts,
// // } from './model/selectors/productSelector';
// export { fetchProductsList } from './model/services/fetchInitProducts/fetchInitProducts';
export { ProductSortField } from '../../shared/const/productConst';
