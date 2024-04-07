import React from 'react';

import { LngLat } from '@yandex/ymaps3-types';
import cls from './Maps.module.scss';
import { IMaps, useLoadMaps } from '@/shared/lib/hooks/useLoadMaps';
import { classNames } from '@/shared/lib/classNames/classNames';

interface MapsProps {
   className?: string;
   location: LngLat;
   zoom: number;
   coordinates?: LngLat;
}

const Maps = (props: MapsProps) => {
   const { className, location, zoom, coordinates } = props;

   const mapsElements: IMaps = useLoadMaps();

   if (!mapsElements) return;

   const {
      YMap,
      YMapDefaultSchemeLayer,
      YMapDefaultFeaturesLayer,
      YMapMarker,
   } = mapsElements;

   return (
      <div className={classNames(cls.Maps, {}, [className])}>
         <YMap
            className={cls.mapYa}
            location={{ center: location, zoom }}
            mode='vector'
         >
            <YMapDefaultSchemeLayer />
            <YMapDefaultFeaturesLayer />
            {coordinates && (
               <YMapMarker coordinates={coordinates} draggable>
                  {true && (
                     <section>
                        <h1>You can drag this header</h1>
                     </section>
                  )}
               </YMapMarker>
            )}
         </YMap>
      </div>
   );
};

export default Maps;
