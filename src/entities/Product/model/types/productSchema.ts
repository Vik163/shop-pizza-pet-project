import { EntityState } from '@reduxjs/toolkit';
import { Product, ProductView } from './product';

export type ViewProducts = {
   [K in ProductView]?: Product[];
};

export interface PaginateData {
   totalItems: number;

   // pagination
   page: number;
   hasMore: boolean;

   // фильтры 9_3
   view: string;
}

export type PaginateProduct = Record<string, PaginateData>;

export interface ProductSchema extends EntityState<Product> {
   isLoadingProducts?: boolean;
   error?: string;
   replace?: string;
   totalItems: number;
   items: Product[];
   view: string;
   page: number;
   limit: number;
   hasMore: boolean;
   paginateData: PaginateProduct;
}

// export interface ProductSchema extends EntityState<Product> {
//    isLoadingProducts?: boolean;
//    error?: string;
//    replace?: string;

//    items: Product[];
//    totalItems: number;

//    // pagination
//    page: number;
//    limit: number;
//    hasMore: boolean;

//    // фильтры 9_3
//    view: ProductView;
// }
