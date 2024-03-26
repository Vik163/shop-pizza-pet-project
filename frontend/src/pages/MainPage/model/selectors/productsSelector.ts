import { StateSchema } from '@/app/providers/StoreProvider';

export const getCards = (state: StateSchema) =>
   state.mainPage.cards || { pizzas: [] };

// export const getProducts = createSelector(
//    getViewProducts,
//    getEntityProducts.selectAll,
//    (view, cards) => {
//       return { [view]: cards };
//    },
// );
