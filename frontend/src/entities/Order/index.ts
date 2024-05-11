export { Order } from './ui/Order/Order';
export type { OrderSchema, Address } from './model/types/order';
export { orderActions, orderReducer } from './model/slices/orderSlice';
export { getTypeDelivery, getAddress } from './model/selectors/orderSelectors';
