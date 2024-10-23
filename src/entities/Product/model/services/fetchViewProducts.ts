import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { LOCALSTORAGE_USER_KEY } from '@/shared/const/localstorage';

import { getViewProducts } from '../selectors/productSelector';
import { ProductSchema } from '../types/productSchema';
import { paginateElements } from '@/shared/const/paginate_elements';
import { getProducts } from '../../api/productApi';

interface FetchViewProductsProps {
   page?: number;
   replace?: string;
}

export const fetchViewProducts = createAsyncThunk<
   ProductSchema,
   FetchViewProductsProps,
   ThunkConfig<string>
>('mainPageProducts/fetchFetchViewProducts', async (props, thunkApi) => {
   const { rejectWithValue, getState, dispatch } = thunkApi;
   const { page, replace } = props;
   // const search = getMainPageSearch(getState());

   const view = getViewProducts(getState());
   const userId = localStorage.getItem(LOCALSTORAGE_USER_KEY);

   try {
      const params = {
         _expand: userId || 'user',
         view,
         _limit: paginateElements,
         _page: page,
         _replace: replace,
         // q: search, // 9_3 24min
      };

      const products = dispatch(getProducts(params)).unwrap();

      if (!products) {
         return rejectWithValue('Товары не найдены');
      }

      // console.log('response.data:', response.data);
      return products;
   } catch (e) {
      return rejectWithValue('Товары не найдены');
   }
});
