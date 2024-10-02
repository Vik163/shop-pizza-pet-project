import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { LOCALSTORAGE_USER_KEY } from '@/shared/const/localstorage';

import { getViewProducts } from '../selectors/productSelector';
import { ProductSchema } from '../types/productSchema';
import { paginateElements } from '@/shared/const/paginate_elements';

interface FetchViewProductsProps {
   page?: number;
   replace?: string;
}

export const fetchViewProducts = createAsyncThunk<
   ProductSchema,
   FetchViewProductsProps,
   ThunkConfig<string>
>('mainPageProducts/fetchFetchViewProducts', async (props, thunkApi) => {
   const { extra, rejectWithValue, getState } = thunkApi;
   const { page, replace } = props;
   // const search = getMainPageSearch(getState());

   const view = getViewProducts(getState());
   const userId = localStorage.getItem(LOCALSTORAGE_USER_KEY);

   try {
      const response = await extra.api.get<ProductSchema>('/products', {
         params: {
            _expand: userId || 'user',
            view,
            _limit: paginateElements,
            _page: page,
            _replace: replace,
            // q: search, // 9_3 24min
         },
      });

      if (!response.data) {
         throw new Error();
      }

      // console.log('response.data:', response.data);
      return response.data;
   } catch (e) {
      return rejectWithValue('error');
   }
});
