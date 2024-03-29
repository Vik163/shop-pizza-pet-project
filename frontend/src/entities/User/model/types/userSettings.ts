import { Theme } from '@/shared/const/theme';
import { ViewLoad } from '@/shared/const/viewLoad';

export interface UserSettings {
   isFirstVisit: boolean;
   addAdvertisement: boolean;
   theme: Theme;
   viewLoadProducts: ViewLoad;
}
