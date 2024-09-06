import { Product } from '@/entities/Product';

export interface BasketPageSchema {
   isLoading?: boolean;
   error?: string;
   additions: Product[];
}
