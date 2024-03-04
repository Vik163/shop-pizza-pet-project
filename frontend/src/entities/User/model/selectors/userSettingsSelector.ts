import { type UserSettings } from '../types/userSettings';
import { Theme } from '@/shared/const/theme';
import { StateSchema } from '@/app/providers/StoreProvider';

const defaultUserSettings: UserSettings = {
   isFirstVisit: true,
   addAdvertisement: false,
   theme: Theme.LIGHT,
};

export const getUserSettings = (state: StateSchema) =>
   state.user?.authData?.userSettings ?? defaultUserSettings;
