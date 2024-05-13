import { memo, useCallback, useState } from 'react';
import { LngLat } from '@yandex/ymaps3-types';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './MapOrListAddresses.module.scss';
import { coordsStores, mainCoordinates } from '@/shared/const/maps';
import { Button } from '@/shared/ui/Button';
import { HStack, VStack } from '@/shared/ui/Stack';
import { FontWeight, Text } from '@/shared/ui/Text';
import { FlexAlign, FlexJustify } from '@/shared/ui/Stack/Flex';
import { Scrollbar } from '@/shared/ui/Scrollbar';
import Maps from '@/shared/ui/Maps/Maps';

interface MapOrListAddressesProps {
   className?: string;
   handleAddress?: (key: string) => void;
}

export const MapOrListAddresses = memo((props: MapOrListAddressesProps) => {
   const { className, handleAddress } = props;
   const [coordActive, setCoordActive] = useState<LngLat>(mainCoordinates);

   const keys = Object.keys(coordsStores);

   const clickAddress = useCallback((key: string) => {
      if (handleAddress) handleAddress(key);
      setCoordActive(coordsStores[key]);
   }, []);

   return (
      <HStack
         className={classNames(cls.MapOrListAddresses, {}, [className])}
         justify={FlexJustify.BETWEEN}
         max
      >
         <VStack
            className={cls.list}
            align={FlexAlign.START}
            justify={FlexJustify.START}
         >
            <Text fontWeight={FontWeight.TEXT_700}>Заберу отсюда:</Text>
            {keys && (
               <Scrollbar
                  name='listAddress'
                  countChildren={keys.length}
                  heightContainer={233}
                  widthContainer={170}
                  scrollWidth={3}
               >
                  {keys.map((key) => (
                     <Button
                        key={key}
                        className={cls.buttons}
                        fontWeight={FontWeight.TEXT_500}
                        onClick={() => clickAddress(key)}
                     >
                        {key}
                     </Button>
                  ))}
               </Scrollbar>
            )}
         </VStack>
         <Maps
            location={coordActive}
            coordsStores={coordsStores}
            zoom={12}
            className={cls.map}
            clickMarker={clickAddress}
         />
      </HStack>
   );
});
