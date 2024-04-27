import { Product, ViewProducts } from '@/entities/Product';

export interface MainPageSchema {
   isLoading?: boolean;
   isLoadingPopularProducts?: boolean;
   error?: string;
   cards: ViewProducts;
   popularProducts?: Product[];
   // фильтры 9_3
   // sort?: ProductSortField;
   search?: string;

   _inited?: boolean; // 9_1 5min
}
