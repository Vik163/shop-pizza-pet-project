import { type Product } from '@/entities/Product';

type KeysProducts = 'pizzas' | 'combos' | 'snacks' | 'drinks' | 'sauces';

export type TypeProducts = {
   [K in KeysProducts]?: Product[];
};

export type Products = TypeProducts[];
