import { ActionsPage } from '@/pages/ActionsPage';
import { BasketPage } from '@/pages/BasketPage';
import { ContactsPage } from '@/pages/ContactsPage';
import { MainPage } from '@/pages/MainPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { OrderPage } from '@/pages/OrderPage';
import { ProfilePage } from '@/pages/ProfilePage';
import {
   AppRoutes,
   getRouteActions,
   getRouteContacts,
   getRouteMain,
   getRouteNotFound,
   getRouteProfile,
   getRouteCombos,
   getRouteDrinks,
   getRoutePizzas,
   getRouteSauces,
   getRouteSnacks,
   getRouteBasket,
   getRouteOrder,
} from '@/shared/const/router';
import { type AppRoutesProps } from '@/shared/types/router';

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
   [AppRoutes.MAIN]: {
      path: getRouteMain(),
      element: <MainPage />,
   },
   [AppRoutes.COMBOS]: {
      path: getRouteCombos(),
      element: <MainPage />,
   },
   [AppRoutes.DRINKS]: {
      path: getRouteDrinks(),
      element: <MainPage />,
   },
   [AppRoutes.PIZZAS]: {
      path: getRoutePizzas(),
      element: <MainPage />,
   },
   [AppRoutes.SAUCES]: {
      path: getRouteSauces(),
      element: <MainPage />,
   },
   [AppRoutes.SNACKS]: {
      path: getRouteSnacks(),
      element: <MainPage />,
   },
   [AppRoutes.ACTIONS]: {
      path: getRouteActions(),
      element: <ActionsPage />,
   },
   [AppRoutes.CONTACTS]: {
      path: getRouteContacts(),
      element: <ContactsPage />,
   },
   [AppRoutes.PROFILE]: {
      path: getRouteProfile(':id'),
      element: <ProfilePage />,
   },
   [AppRoutes.BASKET]: {
      path: getRouteBasket(),
      element: <BasketPage />,
   },
   [AppRoutes.ORDER]: {
      path: getRouteOrder(),
      element: <OrderPage />,
   },
   [AppRoutes.NOT_FOUND]: {
      path: getRouteNotFound(),
      element: <NotFoundPage />,
   },
};
