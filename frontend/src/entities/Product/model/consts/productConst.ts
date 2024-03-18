import { ViewsProducts } from '../types/product';

export const ProductViews: ViewsProducts[] = [
   'pizzas',
   'combos',
   'drinks',
   'sauces',
   'snacks',
];

export enum ProductSortField {
   VIEWS = 'views',
   TITLE = 'title',
   CREATED = 'createdAt',
}

export enum ProductType {
   ALL = 'ALL',
   IT = 'IT',
   SCIENCE = 'SCIENCE',
   ECONOMICS = 'ECONOMICS',
}
