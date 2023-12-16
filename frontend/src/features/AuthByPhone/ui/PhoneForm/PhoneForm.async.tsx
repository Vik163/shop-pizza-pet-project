import { FC, lazy } from 'react';
import { PhoneFormProps } from './PhoneForm';

export const PhoneFormAsync = lazy<FC<PhoneFormProps>>(
   () => import('./PhoneForm'),
);
