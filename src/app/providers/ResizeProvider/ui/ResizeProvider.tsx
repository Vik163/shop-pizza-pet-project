/* eslint-disable react-hooks/exhaustive-deps */
import React, {
   ReactNode,
   useCallback,
   useEffect,
   useMemo,
   useState,
} from 'react';
import { ResizeContext } from '@/shared/lib/context/ResizeContext';
import { Devices, DevicesPosition, Position } from '@/shared/types/devices';
import { points } from '@/shared/const/pointsAdapt';

interface ResizeProviderProps {
   children: ReactNode;
}

const ResizeProvider = (props: ResizeProviderProps) => {
   const { children } = props;

   const [device, setDevice] = useState<DevicesPosition>({
      device: '',
      position: '',
   });
   let size: Devices = '';
   let position: Position = '';

   const handler = useCallback(() => {
      const num = window.innerWidth;
      const numHeight = window.innerHeight;

      if (num < 601) {
         size = size === 'mobile' ? 'pad' : 'mobile';
      } else if (num < 851) {
         size = size === 'pad' ? 'notebook' : 'pad';
      } else if (num < 1301) {
         size = size === 'notebook' ? 'desktop' : 'notebook';
      } else {
         size = 'desktop';
      }
      if (num > numHeight) {
         position = 'horizontal';
      } else {
         position = 'vertical';
      }
      setDevice({ device: size, position });
   }, [size]);

   useEffect(() => {
      if (!device.device) handler();

      points.forEach((num) =>
         window
            .matchMedia(`(min-width: ${num}px)`)
            .addEventListener('change', handler),
      );
      return () => {
         points.forEach((num) =>
            window
               .matchMedia(`(min-width: ${num}px)`)
               .removeEventListener('change', handler),
         );
      };
   }, []);

   // используем useMemo, чтобы при рендере не создавать новый а возвращать старый объект
   // если из массива зависимостей ничего не изменилось
   const defaultProps = useMemo(
      () => ({
         device,
      }),
      [device.device],
   );

   return (
      <ResizeContext.Provider value={defaultProps}>
         {children}
      </ResizeContext.Provider>
   );
};

export default ResizeProvider;
