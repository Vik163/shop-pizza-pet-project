import { Product } from '@/entities/Product/model/types/product';

export interface MainPageShema {
   isLoading?: boolean;
   error?: string;
   cards: Product[];
}
