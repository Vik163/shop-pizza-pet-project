import { AboutProjectPage } from '@/pages/AboutProjectPage';
import { ActionsPage } from '@/pages/ActionsPage';
import { BasketPage } from '@/pages/BasketPage';
import { ContactsPage } from '@/pages/ContactsPage';
import { ErrorPage } from '@/pages/ErrorPage';
import { MainPage } from '@/pages/MainPage';
import { OrderPage } from '@/pages/OrderPage';
import { ProfilePage } from '@/pages/ProfilePage';
import {
   AppRoutes,
   getRouteActions,
   getRouteContacts,
   getRouteProfile,
   getRouteCombos,
   getRouteDrinks,
   getRoutePizzas,
   getRouteSauces,
   getRouteSnacks,
   getRouteBasket,
   getRouteOrder,
   getRouteAbout,
   getRouteMain,
   getRouteError,
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
   [AppRoutes.ABOUT]: {
      path: getRouteAbout(),
      element: <AboutProjectPage />,
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

   [AppRoutes.ERROR]: {
      path: getRouteError(),
      element: <ErrorPage />,
   },
};
