import { EntityState } from '@reduxjs/toolkit';
import { Product, ProductView } from './product';

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

export interface ProductSchema extends EntityState<Product> {
   isLoadingProducts?: boolean;
   error?: string;
   items: Product[];
   totalItems: number;

   // pagination
   page: number;
   limit: number;
   hasMore: boolean;

   // фильтры 9_3
   view: ProductView;
}
