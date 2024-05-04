export type {
   SizePizza,
   DoughPizza,
   BasketOneProduct,
   BasketData,
   BasketSchema,
} from './model/types/basket';

export { basketActions, basketReducer } from './model/slices/basketSlice';
export {
   getDoughView,
   getSizePizza,
   getBasketProducts,
   getBasketTotalPrice,
} from './model/selectors/basketSelector';

export { fetchAddBasket } from './model/services/fetchAddBasket';
export { fetchBasket } from './model/services/fetchBasket';
export { BasketItem, BasketVariant } from './ui/BasketItem/BasketItem';
