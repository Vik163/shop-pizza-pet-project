import { memo } from 'react';
import { Map, YMaps } from '@pbe/react-yandex-maps';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Maps.module.scss';

interface MapsProps {
   className?: string;
}

export const Maps = memo((props: MapsProps) => {
   const { className } = props;

   return (
      <YMaps>
         <div className={classNames(cls.Maps, {}, [className])}>
            <Map
               className={cls.map}
               defaultState={{ center: [53.21, 50.16], zoom: 14 }}
            />
         </div>
      </YMaps>
   );
});
