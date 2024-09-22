import { FC, lazy } from 'react';
import { AboutProjectPageProps } from './AboutProjectPage';

export const AboutProjectPageAsync = lazy<FC<AboutProjectPageProps>>(
   () => import('./AboutProjectPage'),
);
