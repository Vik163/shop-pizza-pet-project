import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { LOCALSTORAGE_USER_KEY } from '@/shared/const/localstorage';

import { getViewProducts } from '../selectors/productSelector';
import { ProductSchema } from '../types/productSchema';
import { paginateElements } from '@/shared/const/paginate_elements';
import { $api } from '@/shared/api/axiosApi';
import { addQueryParams } from '@/shared/lib/url/addQueryParams/addQueryParams';

interface FetchViewProductsProps {
   page?: number;
   replace?: string;
}

export const fetchViewProducts = createAsyncThunk<
   ProductSchema,
   FetchViewProductsProps,
   ThunkConfig<string>
>('mainPageProducts/fetchFetchViewProducts', async (props, thunkApi) => {
   const { rejectWithValue, getState } = thunkApi;
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
      };

      addQueryParams(params); // сохраняет url в истории

      const products = await $api.get(`/products`, {
         params,
      });

      if (!products.data) {
         return rejectWithValue('Товары не найдены');
      }

      return products.data;
   } catch (e) {
      return rejectWithValue('Товары не найдены');
   }
});
