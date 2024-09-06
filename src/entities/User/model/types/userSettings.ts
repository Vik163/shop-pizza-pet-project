import { Theme } from '@/shared/const/theme';
import { ViewLoad } from '@/shared/const/view_load';

export interface UserSettings {
   isFirstVisit: boolean;
   addAdvertisement: boolean;
   theme: Theme;
   viewLoadProducts: ViewLoad;
}
