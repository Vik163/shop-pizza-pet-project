export type {
   Product,
   NewProducts,
   IngredientsViews,
   Ingredients,
   ProductView,
} from './model/types/product';
export type {
   ProductSchema,
   ViewProducts,
   PaginateData,
} from './model/types/productSchema';

export { ProductItem } from './ui/ProductItem/ProductItem';
export { ProductsList } from './ui/ProductsList/ProductsList';

export {
   productActions,
   productReducer,
   getEntityProducts,
} from './model/slice/productsSlice';
export {
   getIsLoadingProducts,
   getLimitProducts,
   getViewProducts,
   getPaginateData,
} from './model/selectors/productSelector';
export { fetchViewProducts } from './model/services/fetchViewProducts';
export { ProductSortField } from '../../shared/const/product_const';
