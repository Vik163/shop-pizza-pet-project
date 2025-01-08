import { DeepPartial } from '@reduxjs/toolkit';
import { productsMocks } from '../../tests/productsMocks';
import { MainPageSchema } from '../types/mainPageSchema';
import { mainPageActions, mainPageReducer } from './mainPageSlice';

// тесты extrareducers в fetchPopularProducts.test.ts
describe('mainPageSlice', () => {
   test('test set cards', () => {
      const state: DeepPartial<MainPageSchema> = { cards: productsMocks };
      expect(
         mainPageReducer(
            state as MainPageSchema,
            mainPageActions.setProducts(productsMocks),
         ),
      ).toEqual({ cards: productsMocks });
   });
});
