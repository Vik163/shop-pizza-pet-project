import { ActionsPage } from '@/pages/ActionsPage';
import { ContactsPage } from '@/pages/ContactsPage';
import { MainPage } from '@/pages/MainPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { YandexLoginPage } from '@/pages/YandexLoginPage';
import {
   AppRoutes,
   getRouteActions,
   getRouteContacts,
   getRouteMain,
   getRouteNotFound,
   getRouteProfile,
   getRouteYaLogin,
} from '@/shared/const/router';
import { AppRoutesProps } from '@/shared/types/router';

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
   [AppRoutes.MAIN]: {
      path: getRouteMain(),
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
   [AppRoutes.YA_LOGIN]: {
      path: getRouteYaLogin(),
      element: <YandexLoginPage />,
   },
   [AppRoutes.NOT_FOUND]: {
      path: getRouteNotFound(),
      element: <NotFoundPage />,
   },
};
