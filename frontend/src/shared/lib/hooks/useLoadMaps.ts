import { YMapReactContainer } from '@yandex/ymaps3-types/imperative/YMapReactContainer';
import { ReactifiedModule, Reactify } from '@yandex/ymaps3-types/reactify';
import { BaseModule } from '@yandex/ymaps3-types/reactify/reactify';
import React, { useEffect, useMemo, useState } from 'react';
import * as ReactDOM from 'react-dom';
import * as ymaps3 from 'ymaps3';

export type IMaps =
   | ReactifiedModule<
        BaseModule &
           typeof ymaps3 & {
              YMapReactContainer: typeof YMapReactContainer;
           }
     >
   | undefined;

export const useLoadMaps = () => {
   const [isReactify, setIsReactify] = useState<Reactify>();

   const getReactify = async () => {
      const ymaps3Reactify = await ymaps3.import('@yandex/ymaps3-reactify');
      const reactify = ymaps3Reactify.reactify.bindTo(React, ReactDOM);
      setIsReactify(reactify);
   };

   useEffect(() => {
      getReactify();
   }, []);

   const getMapsElements = useMemo(() => {
      if (isReactify) {
         return isReactify.module(ymaps3);
      }
   }, [isReactify]);

   const mapsElements = getMapsElements || undefined;

   return mapsElements;
};
