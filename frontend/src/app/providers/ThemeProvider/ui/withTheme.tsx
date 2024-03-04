import React from 'react';
import { useSelector } from 'react-redux';
import ThemeProvider from './ThemeProvider';
import { getUserSettings } from '@/entities/User';

export const withTheme = (Component: React.ComponentType) => {
   return () => {
      const { theme: defaultTheme } = useSelector(getUserSettings);
      return (
         <ThemeProvider initialTheme={defaultTheme}>
            <Component />
         </ThemeProvider>
      );
   };
};
