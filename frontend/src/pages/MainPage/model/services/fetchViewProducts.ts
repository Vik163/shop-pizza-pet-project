import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import {} from // getMainPageLimit,
// getMainPageNum,
// getMainPageSearch,
'../selectors/mainPageSelectors';
import { LOCALSTORAGE_USER_KEY } from '@/shared/const/localstorage';
import { getViewProducts } from '../selectors/productsSelector';
import { PaginateSchema } from '../types/mainPageSchema';

// 8_5 3min пагинация
interface FetchViewProductsProps {
   //    page?: number
   replace?: boolean;
}

// 8_4
export const fetchViewProducts = createAsyncThunk<
   PaginateSchema,
   FetchViewProductsProps,
   ThunkConfig<string>
>('articlesPage/fetchFetchViewProducts', async (props, thunkApi) => {
   const { extra, rejectWithValue, getState } = thunkApi;
   // const limit = getMainPageLimit(getState());
   // const search = getMainPageSearch(getState());
   // const page = getMainPageNum(getState());

   const view = getViewProducts(getState());
   const userId = localStorage.getItem(LOCALSTORAGE_USER_KEY);

   try {
      // addQueryParams({
      //    // search,
      //    view,
      // });
      const response = await extra.api.get<PaginateSchema>('/products', {
         params: {
            _expand: userId || 'user',
            view,
            // 8_5 4,58min
            _limit: 4,
            _page: 1,
            // q: search, // 9_3 24min
         },
      });

      if (!response.data) {
         throw new Error();
      }

      console.log('response.data:', response.data);
      return response.data;
   } catch (e) {
      return rejectWithValue('error');
   }
});
