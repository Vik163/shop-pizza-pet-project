import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { getMainPageSearch } from '../../model/selectors/mainPageSelectors';
import { ProductView } from '@/entities/Product';
import { mainPageActions } from '../../model/slices/mainPageSlice';
import { useAppDispatch } from '../../../../shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getViewProducts } from '../../model/selectors/paginateSelector';
// import { fetchMainList } from '../../model/services/fetchMainList/fetchMainList';
// import { useDebounce } from './useDebounce/useDebounce';

// 16_6 18min
export function useProductsFilters() {
   const viewProduct = useSelector(getViewProducts);
   const search = useSelector(getMainPageSearch);

   const dispatch = useAppDispatch();

   // const fetchData = useCallback(() => {
   //    dispatch(fetchMainList({ replace: true }));
   // }, [dispatch]);

   // const debouncedFetchData = useDebounce(fetchData, 500);

   const onChangeViewProducts = useCallback(
      (view: ProductView) => {
         dispatch(mainPageActions.setView(view));
      },
      [dispatch],
   );

   // const onChangeSort = useCallback(
   //    (newSort: MainortField) => {
   //       dispatch(MainPageActions.setSort(newSort));
   //       dispatch(MainPageActions.setPage(1));
   //       fetchData();
   //    },
   //    [dispatch, fetchData],
   // );

   // const onChangeSearch = useCallback(
   //    (search: string) => {
   //       dispatch(MainPageActions.setSearch(search));
   //       dispatch(MainPageActions.setPage(1));
   //       debouncedFetchData();
   //    },
   //    [dispatch, debouncedFetchData],
   // );

   // const onChangeType = useCallback(
   //    (value: ProductType) => {
   //       dispatch(mainPageActions.setType(value));
   //       dispatch(mainPageActions.setPage(1));
   //       fetchData();
   //    },
   //    [dispatch, fetchData],
   // );

   return {
      viewProduct,
      // sort,
      search,
      // type,
      onChangeViewProducts,
      // onChangeSort,
      // onChangeSearch,
      // onChangeType,
   };
}
