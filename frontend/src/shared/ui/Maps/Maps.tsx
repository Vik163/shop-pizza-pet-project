import React, { useEffect, useState } from 'react';

import { LngLat } from '@yandex/ymaps3-types';
import cls from './Maps.module.scss';
import { IMaps, useLoadMaps } from '@/shared/lib/hooks/useLoadMaps';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Icon } from '../Icon';
import markerStore from '@/shared/assets/icons/marker_store.png';
import markerCar from '@/shared/assets/icons/marker_car.png';
import logo from '@/shared/assets/icons/shop_logo.png';
import { FontColor, FontSize, Text, TextAlign } from '../Text';
import { HStack, VStack } from '../Stack';
import { FlexAlign, FlexJustify } from '../Stack/Flex';
import { address } from '@/shared/const/main_info';

interface MapsProps {
   className?: string;
   location: LngLat;
   zoom: number;
   coordStore?: LngLat;
   coordCar?: LngLat;
}

const Maps = (props: MapsProps) => {
   const { className, location, zoom, coordStore, coordCar } = props;
   const [isLoading, setIsLoading] = useState(false);

   const mapsElements: IMaps = useLoadMaps();

   useEffect(() => {
      setIsLoading(true);
      if (mapsElements)
         setTimeout(() => {
            setIsLoading(false);
         }, 800);
   }, [mapsElements]);

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
                  {!isLoading && (
                     <VStack
                        align={FlexAlign.CENTER}
                        className={cls.markerContainer}
                     >
                        <VStack className={cls.infoContainer}>
                           <HStack
                              justify={FlexJustify.CENTER}
                              gap={10}
                              className={cls.logoContainer}
                           >
                              <Icon className={cls.logo} src={logo} />
                              <Text
                                 fontColor={FontColor.TEXT_BUTTON}
                                 fontSize={FontSize.SIZE_13}
                                 align={TextAlign.TEXT_CENTER}
                                 className={cls.name}
                              >
                                 Shop Pizza
                              </Text>
                           </HStack>
                           <Text
                              fontColor={FontColor.TEXT_BUTTON}
                              fontSize={FontSize.SIZE_13}
                              align={TextAlign.TEXT_CENTER}
                              className={cls.mapInfo}
                           >
                              {address}
                           </Text>
                           <Text
                              fontColor={FontColor.TEXT_BUTTON}
                              fontSize={FontSize.SIZE_13}
                              align={TextAlign.TEXT_CENTER}
                              className={cls.mapInfo}
                           >
                              открыто: до 23:00
                           </Text>
                        </VStack>
                        <Icon
                           width={40}
                           height={40}
                           className={cls.markerStore}
                           src={markerStore}
                        />
                     </VStack>
                  )}
               </YMapMarker>
            )}
            {coordCar && (
               <YMapMarker coordinates={coordCar} draggable>
                  {!isLoading && (
                     <VStack
                        align={FlexAlign.CENTER}
                        className={cls.markerContainer}
                     >
                        <Text
                           fontColor={FontColor.TEXT_BUTTON}
                           fontSize={FontSize.SIZE_13}
                           align={TextAlign.TEXT_CENTER}
                           className={cls.infoContainer}
                        >
                           сервис маршрутов не использовался
                        </Text>
                        <Icon
                           width={40}
                           height={40}
                           className={cls.markerStore}
                           src={markerCar}
                        />
                     </VStack>
                  )}
               </YMapMarker>
            )}
         </YMap>
      </div>
   );
};

export default Maps;
