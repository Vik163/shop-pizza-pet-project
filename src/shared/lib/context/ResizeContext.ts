import { createContext } from 'react';
import { DevicesPosition } from '@/shared/types/devices';

export interface ResizeContextProps {
   device?: DevicesPosition;
}

export const ResizeContext = createContext<ResizeContextProps>({});
