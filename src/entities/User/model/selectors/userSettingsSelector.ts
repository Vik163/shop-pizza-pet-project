import { type UserSettings } from '../types/userSettings';
import { Theme } from '@/shared/const/theme';
import { StateSchema } from '@/app/providers/StoreProvider';
import {
   LOCAL_STORAGE_THEME_KEY,
   LOCAL_STORAGE_VIEW_LOAD_KEY,
} from '@/shared/const/localstorage';
import { ViewLoad } from '@/shared/const/view_load';

const defaultUserSettings: UserSettings = {
   isFirstVisit: true,
   addAdvertisement: false,
   theme:
      (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.LIGHT,
   viewLoadProducts:
      (localStorage.getItem(LOCAL_STORAGE_VIEW_LOAD_KEY) as ViewLoad) ||
      ViewLoad.PAGES,
};

export const getUserSettings = (state: StateSchema) =>
   state.user?.authData?.userSettings ?? defaultUserSettings;
export const getLoadProducts = (state: StateSchema) =>
   state.user?.loadProductMobile || 'scroll';
