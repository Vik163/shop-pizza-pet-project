import { StateSchema } from '@/app/providers/StoreProvider';

export const getAddress = (state: StateSchema) => state.order?.address;
export const getDeliveryInfo = (state: StateSchema) => state.order?.delivery;
