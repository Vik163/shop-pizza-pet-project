import {
   type ProductView,
   type ProductSortField,
   type ProductType,
   Product,
} from '@/entities/Product';
import { ScrollingCards } from '@/features/HorizontalScrolling';

export interface PaginateSchema {
   items: Product[];
   page?: number;
   limit?: number;
   hasMore?: boolean;
   totalItems?: number;
}

export interface MainPageSchema {
   isLoading?: boolean;
   isLoadingProducts?: boolean;
   isLoadingPopularProducts?: boolean;
   error?: string;
   items: Product[];
   popularProducts?: Product[];
   actionItems?: ScrollingCards[];
   blockTopScroll?: string;
   totalItems?: number;

   // pagination
   page?: number;
   limit?: number;
   hasMore?: boolean;

   // фильтры 9_3
   view: ProductView;
   sort?: ProductSortField;
   search?: string;
   type?: ProductType;

   _inited?: boolean; // 9_1 5min
}
