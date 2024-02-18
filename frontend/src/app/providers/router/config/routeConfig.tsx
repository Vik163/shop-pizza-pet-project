import { ActionsPage } from '@/pages/ActionsPage';
import { ContactsPage } from '@/pages/ContactsPage';
import { MainPage } from '@/pages/MainPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProfilePage } from '@/pages/ProfilePage';
import {
   AppRoutes,
   getRouteActions,
   getRouteContacts,
   getRouteMain,
   getRouteNotFound,
   getRouteProfile,
} from '@/shared/const/router';
import { type AppRoutesProps } from '@/shared/types/router';

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
   [AppRoutes.NOT_FOUND]: {
      path: getRouteNotFound(),
      element: <NotFoundPage />,
   },
};
