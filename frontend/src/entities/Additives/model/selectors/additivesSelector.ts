import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';

export const getAdditives = (state: StateSchema) => state.additives?.additives;

// == reselect ============================================================
// Возвращает массив названий добавок и их общую стоимость (добавляет, удаляет)
const additivesSelect = (state: StateSchema) =>
   state.additives?.additivesSelect;

let price = 0;
export const getOrderAdditives = createSelector(
   [additivesSelect, getAdditives],
   (obj, additives) => {
      // Удаляет если нажимаешь на карточку (карта передается сюда) и есть  такое же название в массиве
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

         // Возвращает стоимость выбранных добавок из корзины, если есть заказ
         // вызывается при монтировании (карта не передается сюда)
         // ищет совпадения в массиве добавок
      } else if (!obj?.card && obj?.orderAdditives && additives) {
         const { orderAdditives } = obj;

         orderAdditives.forEach((name) => {
            const item = additives.find((i) => i.title === name);
            if (item) price += item.price[0];
         });
         return { price };

         // если ничего не передается возвращает 0
      } else {
         price = 0;
      }
   },
);
