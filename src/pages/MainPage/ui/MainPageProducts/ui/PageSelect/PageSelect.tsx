import { memo, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';

import cls from './PageSelect.module.scss';
import { Button } from '@/shared/ui/Button';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import {
   fetchViewProducts,
   PaginateData,
   productActions,
   ProductSchema,
} from '@/entities/Product';
import { paginateElements } from '@/shared/const/paginate_elements';

interface PageSelectProps {
   className?: string;
   countButtons?: number;
   paginateData: PaginateData;
}

export const PageSelect = memo((props: PageSelectProps) => {
   const { className, countButtons = 5, paginateData } = props;
   const { pathname } = useLocation();
   const dispatch = useAppDispatch();
   const [numPage, setNumPage] = useState(1);
   const { page, totalItems } = paginateData;

   // определяем количество полученных страниц и количество видимых кнопок
   const pages = Math.ceil(totalItems / paginateElements);
   const buttons = pages < countButtons ? pages : countButtons;

   // массив для отрисовки кнопок (зависит от количества кнопок и выбранной страницы)
   const initialArr = () => {
      const arr: number[] = [];

      for (let i = 0; i < buttons; ) {
         arr[i] = numPage + i;
         i += 1;
      }
      return arr;
   };

   const arrPages = initialArr();

   // При обновлении страницы возвращает первоначальную нумерацию
   useEffect(() => {
      setNumPage(1);
   }, [pathname]);

   // После запроса устанавливает нужную нумерацию и переводит скролл
   const clickPage = (pageProducts: number) => {
      dispatch(
         fetchViewProducts({
            page: pageProducts,
            replace: pathname === '/' ? 'pizzas' : pathname.slice(1),
         }),
      ).then((res) => {
         if (res.payload) {
            const { view } = res.payload as ProductSchema;

            dispatch(productActions.setSavePage({ view, page: pageProducts }));

            window.scrollTo({
               top: 600,
               behavior: 'smooth',
            });
            if (pageProducts < 3) {
               setNumPage(1);
            } else if (pageProducts === pages) {
               setNumPage(pageProducts - (buttons - 1));
            } else if (pageProducts === pages - 1) {
               setNumPage(pageProducts - (buttons - 2));
            } else {
               setNumPage(pageProducts - (buttons - 3));
            }
         }
      });
   };

   const decreasePage = () => {
      setNumPage(numPage - 1);
   };

   const increasePage = () => {
      if (numPage < pages - (buttons - 1)) setNumPage(numPage + 1);
   };

   const modsRightArrow: Mods = {
      [cls.inActive]: numPage > pages - buttons,
   };
   const modsLeftArrow: Mods = {
      [cls.inActive]: numPage < 2,
   };

   return (
      <div
         id='container'
         className={classNames(cls.PageSelect, {}, [className])}
      >
         {pages > buttons && (
            <Button
               onClick={decreasePage}
               className={classNames(cls.page, modsLeftArrow, [])}
            >
               &lt;&lt;
            </Button>
         )}
         {arrPages.length > 1 &&
            arrPages.map((item) => (
               <Button
                  key={item}
                  className={classNames(
                     cls.page,
                     { [cls.active]: item === page },
                     [],
                  )}
                  onClick={() => clickPage(item)}
               >
                  {item}
               </Button>
            ))}
         {pages > buttons && (
            <Button
               disabled={numPage > pages - buttons}
               onClick={increasePage}
               className={classNames(cls.page, modsRightArrow, [])}
            >
               &gt;&gt;
            </Button>
         )}
      </div>
   );
});
