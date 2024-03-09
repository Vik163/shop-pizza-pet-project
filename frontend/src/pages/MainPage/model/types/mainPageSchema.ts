import {
   type ProductView,
   type ProductSortField,
   type ProductType,
   Product,
} from '@/entities/Product';
import { ScrollingCards } from '@/features/HorizontalScrolling';

export interface MainPageSchema {
   isLoading?: boolean;
   error?: string;
   cards: Product[];
   popularProducts?: Product[];
   actionCards?: ScrollingCards[];

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
