export { Order } from './ui/Order/Order';
export type { OrderSchema, Address, TypeDelivery } from './model/types/order';
export { orderActions, orderReducer } from './model/slices/orderSlice';
export { getTypeDelivery } from './model/selectors/orderSelectors';
export {
   getDeliveryInfo,
   getAddress,
} from './model/selectors/addressSelectors';
