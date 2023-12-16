import { Product } from '@/entities/Product/model/types/product';

type KeysProducts = 'pizzas' | 'combos' | 'snacks' | 'drinks' | 'sauces';

export type TypeProducts = {
   [K in KeysProducts]?: Product[];
};

export type Products = TypeProducts[];
