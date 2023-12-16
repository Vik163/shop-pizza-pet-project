import { ReactNode, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './AppLink.module.scss';
import { LinkProps } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

interface AppLinkProps extends LinkProps {
   className?: string;
   activeClassName?: string;
   children: ReactNode;
}

export const AppLink = memo((props: AppLinkProps) => {
   const {
      className,
      to,
      activeClassName = '',
      children,
      ...otherProps
   } = props;

   return (
      <NavLink
         to={to}
         className={({ isActive }) =>
            classNames(cls.AppLink, { [activeClassName]: isActive }, [
               className,
            ])
         }
         {...otherProps}
      >
         {children}
      </NavLink>
   );
});
