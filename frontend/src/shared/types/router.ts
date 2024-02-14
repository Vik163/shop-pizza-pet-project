import { type RouteProps } from 'react-router-dom';

export type AppRoutesProps = RouteProps & {
   AuthOnly?: boolean;
   // roles?: UserRole[]
};
