import { StateSchema } from '@/app/providers/StoreProvider';

export const getTypeDelivery = (state: StateSchema) =>
   state.order?.delivery || 'Доставка';
export const getAddress = (state: StateSchema) => state.order?.address;
