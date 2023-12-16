import { RoutePath } from '@/shared/const/router';

export interface NavbarItemType {
   path: string;
   text: string;
}

export const navbarItems = [
   {
      path: RoutePath.main,
      text: 'Пиццы',
   },
   {
      path: RoutePath.main,
      text: 'Закуски',
   },
   {
      path: RoutePath.main,
      text: 'Соусы',
   },
   {
      path: RoutePath.main,
      text: 'Напитки',
   },
   {
      path: RoutePath.main,
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
