import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import {
   // getMainPageLimit,
   // getMainPageNum,
   // getMainPageSearch,
   getMainPageView,
} from '../selectors/mainPageSelectors';
import { Product } from '@/entities/Product';
import { LOCALSTORAGE_USER_KEY } from '@/shared/const/localstorage';

// 8_5 3min пагинация
interface FetchViewProductsProps {
   //    page?: number
   replace?: boolean;
}

// 8_4
export const fetchViewProducts = createAsyncThunk<
   Product[],
   FetchViewProductsProps,
   ThunkConfig<string>
>('articlesPage/fetchFetchViewProducts', async (props, thunkApi) => {
   const { extra, rejectWithValue, getState } = thunkApi;
   // const limit = getMainPageLimit(getState());
   // const search = getMainPageSearch(getState());
   // const page = getMainPageNum(getState());
   const view = getMainPageView(getState());
   const userId = localStorage.getItem(LOCALSTORAGE_USER_KEY);

   try {
      // addQueryParams({
      //    // search,
      //    view,
      // });
      const response = await extra.api.get<Product[]>('/products', {
         params: {
            _expand: userId || 'user',
            view,
            // 8_5 4,58min
            // _limit: limit,
            // _page: page,
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
