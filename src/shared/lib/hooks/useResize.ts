import { useContext } from 'react';
import { ResizeContext } from '../context/ResizeContext';

export const useResize = () => {
   const { device } = useContext(ResizeContext);
   const isMobile = device?.device === 'mobile';
   const isPad = device?.device === 'pad';
   const isNotebook = device?.device === 'notebook';
   const isDesktop = device?.device === 'desktop';
   const isVertical = device?.position === 'vertical';
   const isHorizontal = device?.position === 'horizontal';

   return { isMobile, isPad, isNotebook, isDesktop, isHorizontal, isVertical };
};
