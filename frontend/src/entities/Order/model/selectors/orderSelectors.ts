import { StateSchema } from '@/app/providers/StoreProvider';

export const getTypeDelivery = (state: StateSchema) =>
   state.order?.typeDelivery || 'Доставка';
