export type {
   Product,
   NewProducts,
   IngredientsViews,
   Ingredients,
   ProductView,
} from './model/types/product';
export type {
   PaginateSchema,
   ProductSchema,
   ViewProducts,
} from './model/types/productSchema';

export { ProductItem } from './ui/ProductItem/ProductItem';
export { ProductsList } from './ui/ProductsList/ProductsList';
export { NewProduct } from './ui/NewProduct/NewProduct';

export {
   productActions,
   productReducer,
   getEntityProducts,
} from './model/slice/productsSlice';
export {
   getIsLoadingProducts,
   getLimitProducts,
   getPageHasMore,
   getPageProductsNum,
   getTotalProducts,
   getViewProducts,
} from './model/selectors/productSelector';
export { fetchViewProducts } from './model/services/fetchViewProducts';
export { ProductSortField } from '../../shared/const/product_const';
