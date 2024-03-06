import { type UserSettings } from '../types/userSettings';
import { Theme } from '@/shared/const/theme';
import { StateSchema } from '@/app/providers/StoreProvider';
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localstorage';

const defaultUserSettings: UserSettings = {
   isFirstVisit: true,
   addAdvertisement: false,
   theme:
      (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.LIGHT,
};

export const getUserSettings = (state: StateSchema) =>
   state.user?.authData?.userSettings ?? defaultUserSettings;
