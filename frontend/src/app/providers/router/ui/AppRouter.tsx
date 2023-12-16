import { AppRoutesProps } from '@/shared/types/router';
import { Suspense, memo, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from '../config/routeConfig';

const AppRouter = () => {
   const renderWithWrapper = useCallback((route: AppRoutesProps) => {
      const element = <Suspense fallback={'ddfgdf'}>{route.element}</Suspense>;

      return <Route key={route.path} path={route.path} element={element} />;
   }, []);

   return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
};

export default memo(AppRouter);
