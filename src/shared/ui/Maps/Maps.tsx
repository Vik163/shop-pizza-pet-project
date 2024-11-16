import React from 'react';

import { LngLat } from '@yandex/ymaps3-types';
import cls from './Maps.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Icon } from '../Icon';
import markerStore from '@/shared/assets/icons/marker_store.png';
import markerCar from '@/shared/assets/icons/marker_car.png';
import logo from '@/shared/assets/icons/shop_logo.png';
import { FontColor, FontSize, Text, TextAlign } from '../Text';
import { HStack, VStack } from '../Stack';
import { FlexAlign, FlexJustify } from '../Stack/Flex';
import { Coords } from '@/shared/types/maps';
import { Button } from '../Button';
import {
   YMap,
   YMapDefaultFeaturesLayer,
   YMapDefaultSchemeLayer,
   YMapMarker,
} from '@/shared/lib/ymaps/ymaps';

interface MapsProps {
   className?: string;
   location: LngLat;
   zoom: number;
   coordsStores?: Coords;
   coordCar?: LngLat;
   clickMarker?: (key: string) => void;
}

const Maps = (props: MapsProps) => {
   const { className, location, zoom, coordsStores, coordCar, clickMarker } =
      props;

   const keysCoords = coordsStores && Object.keys(coordsStores);

   return (
      <div className={classNames(cls.Maps, {}, [className])}>
         <YMap
            location={{ center: location, zoom, duration: 800 }}
            mode='vector'
            className={classNames(cls.mapYa, {}, [className])}
         >
            <YMapDefaultSchemeLayer />
            <YMapDefaultFeaturesLayer />
            {keysCoords &&
               keysCoords.map((key) => (
                  <YMapMarker key={key} coordinates={coordsStores[key]}>
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
                              {key}
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
                        <Button onClick={() => clickMarker && clickMarker(key)}>
                           <Icon
                              width={40}
                              height={40}
                              className={cls.markerStore}
                              src={markerStore}
                           />
                        </Button>
                     </VStack>
                  </YMapMarker>
               ))}
            {coordCar && (
               <YMapMarker coordinates={coordCar} draggable>
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
               </YMapMarker>
            )}
         </YMap>
      </div>
   );
};

export default Maps;
