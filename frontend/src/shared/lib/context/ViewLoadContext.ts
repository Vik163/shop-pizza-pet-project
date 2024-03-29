import { createContext } from 'react';
import { ViewLoad } from '@/shared/const/viewLoad';

export interface ViewLoadContextProps {
   viewLoad?: ViewLoad;
   setViewLoad?: (viewLoad: ViewLoad) => void;
}

export const ViewLoadContext = createContext<ViewLoadContextProps>({});
