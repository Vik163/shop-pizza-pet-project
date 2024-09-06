import { type FC, lazy } from 'react';
import { type PhoneFormProps } from './PhoneForm';

export const PhoneFormAsync = lazy<FC<PhoneFormProps>>(
   () => import('./PhoneForm'),
);
