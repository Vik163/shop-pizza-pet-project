import { RoutePath } from '@/shared/const/router';

export interface NavbarItemType {
   path: string;
   text: string;
}

export const navbarItems = [
   {
      path: RoutePath.pizzas,
      text: 'Пиццы',
   },
   {
      path: RoutePath.snacks,
      text: 'Закуски',
   },
   {
      path: RoutePath.sauces,
      text: 'Соусы',
   },
   {
      path: RoutePath.drinks,
      text: 'Напитки',
   },
   {
      path: RoutePath.combos,
      text: 'Комбо',
   },
   {
      path: RoutePath.actions,
      text: 'Акции',
   },
   {
      path: RoutePath.contacts,
      text: 'Контакты',
   },
];
