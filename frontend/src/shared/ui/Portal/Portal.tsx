import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
   children: ReactNode; // Что телепортируем
   element?: HTMLElement; // Куда телепортируем
}

export const Portal = (props: PortalProps) => {
   const { children, element = document.body } = props;

   return createPortal(children, element);
};
