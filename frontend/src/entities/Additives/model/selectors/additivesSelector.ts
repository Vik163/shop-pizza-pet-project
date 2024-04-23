import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';

export const getAdditives = (state: StateSchema) => state.additives?.additives;

// == reselect ============================================================
// Возвращает массив названий добавок и их общую стоимость (добавляет, удаляет)
const additivesSelect = (state: StateSchema) =>
   state.additives?.additivesSelect;

let price = 0;
export const getOrderAdditives = createSelector([additivesSelect], (obj) => {
   if (obj?.card && obj.orderAdditives) {
      const { orderAdditives, card } = obj;

      if (card) {
         if (
            orderAdditives.length > 0 &&
            orderAdditives.some((item) => item === card.title)
         ) {
            const orderAdditivesTitle = orderAdditives.filter(
               (item) => item !== card.title,
            );
            price -= card.price[0];

            return { orderAdditivesTitle, price };
         }
         const orderAdditivesTitle = [...orderAdditives, card.title];
         price += card.price[0];

         return { orderAdditivesTitle, price };
      }
   } else {
      price = 0;
   }
});
