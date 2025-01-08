import { DeepPartial } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
import { getMainPageError, getMainPageIsLoading } from './mainPageSelectors';

describe('mainPageIsSelector', () => {
   test('should return mainPage isLoading', () => {
      const state: DeepPartial<StateSchema> = {
         mainPage: { isLoading: true },
      };
      expect(getMainPageIsLoading(state as StateSchema)).toBe(true);
   });
   test('should work with empty state', () => {
      const state: DeepPartial<StateSchema> = {};
      expect(getMainPageIsLoading(state as StateSchema)).toBe(false);
   });

   test('should return error when fetch reject', () => {
      const state: DeepPartial<StateSchema> = {
         mainPage: { error: 'error' },
      };
      expect(getMainPageError(state as StateSchema)).toBe('error');
   });
   test('should work with empty state', () => {
      const state: DeepPartial<StateSchema> = {};
      expect(getMainPageError(state as StateSchema)).toBe(undefined);
   });
});
