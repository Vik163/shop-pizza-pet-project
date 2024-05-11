export interface Address {
   city: string;
   street: string;
   house: string;
   apartment?: string;
   entrance?: string;
   floor?: string;
   comment?: string;
}

export interface OrderSchema {
   isLoading?: boolean;
   error?: string;
   delivery: string;
   address: Address;
   //    additionToOrder: Product[];
}
