import { EntityState } from '@reduxjs/toolkit';
import { Product, ProductView } from '@/entities/Product';
import { ScrollingCards } from '@/features/HorizontalScrolling';

// export type ViewProducts = Record<string, Product[]>;

export type ViewProducts = {
   [K in ProductView]?: Product[];
};

export interface PaginateSchema {
   items: Product[];
   page: number;
   limit: number;
   hasMore: boolean;
   totalItems: number;
   replace?: string;
   view: ProductView;
}

export interface MainPageSchema extends EntityState<Product> {
   isLoading?: boolean;
   isLoadingProducts?: boolean;
   isLoadingPopularProducts?: boolean;
   error?: string;
   items: Product[];
   cards: ViewProducts;
   popularProducts?: Product[];
   actionItems?: ScrollingCards[];
   totalItems: number;

   // pagination
   page: number;
   limit: number;
   hasMore: boolean;

   // фильтры 9_3
   view: ProductView;
   // sort?: ProductSortField;
   search?: string;

   _inited?: boolean; // 9_1 5min
}
