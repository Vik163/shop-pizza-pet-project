import { type FC, lazy } from 'react';
import { type AdditivesProps } from './Additives';

export const AdditivesAsync = lazy<FC<AdditivesProps>>(
   () => import('./Additives'),
);
