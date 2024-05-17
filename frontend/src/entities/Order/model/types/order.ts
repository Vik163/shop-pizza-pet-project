export interface Address {
   city: string;
   street: string;
   house: string;
   apartment?: string;
   entrance?: string;
   floor?: string;
   comment?: string;
}

export type TypeDelivery = 'Доставка' | 'Самовывоз';

export interface Delivery {
   textAddress?: string;
   typeDelivery: TypeDelivery;
}

export interface OrderSchema {
   isLoading?: boolean;
   error?: string;
   typeDelivery: TypeDelivery;
   address: Address;
   delivery?: Delivery;

   //    additionToOrder: Product[];
}
