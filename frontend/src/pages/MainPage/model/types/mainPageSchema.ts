import { type Product } from '@/entities/Product';

export interface MainPageShema {
   isLoading?: boolean;
   error?: string;
   cards: Product[];
}
