import { Suspense, memo } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { type AppRoutesProps } from '@/shared/types/router';
import { routeConfig } from '../config/routeConfig';
import { PageLoader } from '@/widgets/PageLoader';
import { HomePage } from '@/pages/HomePage';

const AppRouter = () => {
   const renderWithWrapper = (route: AppRoutesProps) => {
      // лоадер для подгружаемых файлов
      const element = (
         <Suspense fallback={<PageLoader />}>{route.element}</Suspense>
      );

      return { path: route.path, element };
   };

   const routes = [
      {
         path: '/',
         element: <HomePage />,
         children: Object.values(routeConfig).map(renderWithWrapper),
      },
   ];

   const router = createBrowserRouter(routes);

   return <RouterProvider router={router} />;
};

export default memo(AppRouter);
