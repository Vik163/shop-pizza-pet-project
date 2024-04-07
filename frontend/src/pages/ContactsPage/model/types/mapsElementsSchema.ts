import { ForwardRefExoticComponent } from 'react';
import * as ymaps3 from 'ymaps3';

export interface IMaps {
   YMap: ForwardRefExoticComponent<ymaps3.YMapProps>;
   YMapDefaultSchemeLayer: ForwardRefExoticComponent<ymaps3.YMapDefaultSchemeLayerProps>;
   YMapDefaultFeaturesLayer: ForwardRefExoticComponent<ymaps3.YMapDefaultFeaturesLayerProps>;
   YMapMarker: ForwardRefExoticComponent<ymaps3.YMapMarkerProps>;
}

export interface MapsElementsSchema {
   isLoading?: boolean;
   error?: string;
   maps: IMaps | undefined;
}
