import React from 'react';

import { LngLat } from '@yandex/ymaps3-types';
import cls from './Maps.module.scss';
import { IMaps, useLoadMaps } from '@/shared/lib/hooks/useLoadMaps';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Icon } from '../Icon';
import markerStore from '@/shared/assets/icons/marker_store.png';
import markerCar from '@/shared/assets/icons/marker_car.png';

interface MapsProps {
   className?: string;
   location: LngLat;
   zoom: number;
   coordStore?: LngLat;
   coordCar?: LngLat;
}

const Maps = (props: MapsProps) => {
   const { className, location, zoom, coordStore, coordCar } = props;

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
            {coordStore && (
               <YMapMarker coordinates={coordStore} draggable>
                  {true && (
                     <section className={cls.markerContainer}>
                        <div className={cls.mapInfo}>dfgdfgdfg</div>
                        <Icon
                           width={40}
                           height={40}
                           className={cls.markerStore}
                           src={markerStore}
                        />
                     </section>
                  )}
               </YMapMarker>
            )}
            {coordCar && (
               <YMapMarker coordinates={coordCar} draggable>
                  {true && (
                     <Icon
                        width={40}
                        height={40}
                        className={cls.markerStore}
                        src={markerCar}
                     />
                  )}
               </YMapMarker>
            )}
         </YMap>
      </div>
   );
};

export default Maps;
