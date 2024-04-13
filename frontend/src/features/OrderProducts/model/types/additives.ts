export interface Additives {
   _id: string;
   image: string;
   title: string;
   price: number[];
}

export interface AdditivesSchema {
   isLoading?: boolean;
   error?: string;
   additives?: Additives[];
}
