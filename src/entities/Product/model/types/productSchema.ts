import { EntityState } from '@reduxjs/toolkit';
import { Product, ProductView } from './product';

export type ViewProducts = {
   [K in ProductView]?: Product[];
};

export interface PaginateData {
   totalItems: number;
   page: number;
   hasMore: boolean;
   view: string;
}

export interface SavePageData {
   page: number;
   view: string;
}

export interface ScrollSchema {
   path: string;
   position: number;
}

export interface ProductSchema extends EntityState<Product> {
   isLoadingProducts?: boolean;
   error?: string;
   replace?: string;
   items: Product[];
   view: string;
   totalItems: number;
   page: number;
   hasMore: boolean;
   savePage: Record<string, SavePageData>;
   paginateProduct: Record<string, PaginateData>;
   saveScroll: Record<string, ScrollSchema>;
}
