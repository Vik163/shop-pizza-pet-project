import { useState } from 'react';
import { ViewLoad } from '@/shared/const/view_load';
import { LOCAL_STORAGE_VIEW_LOAD_KEY } from '@/shared/const/localstorage';

interface UseViewLoadResult {
   toggleViewLoad: (saveAction?: (viewLoad: ViewLoad) => void) => void;
   viewLoad: ViewLoad;
}

// Возвращаем объект
export function useViewLoadProducts(): UseViewLoadResult {
   const [viewLoad, setViewLoad] = useState(
      (localStorage.getItem(LOCAL_STORAGE_VIEW_LOAD_KEY) as ViewLoad) ||
         ViewLoad.PAGES,
   );

   const toggleViewLoad = (saveAction?: (view: ViewLoad) => void) => {
      let newView;
      switch (viewLoad) {
         case ViewLoad.PAGES:
            newView = ViewLoad.SCROLL;
            break;
         case ViewLoad.SCROLL:
            newView = ViewLoad.PAGES;
            break;
         default:
            newView = ViewLoad.PAGES;
      }

      setViewLoad(newView);

      saveAction?.(newView);
   };

   return {
      viewLoad: viewLoad || ViewLoad.PAGES,
      toggleViewLoad,
   };
}
