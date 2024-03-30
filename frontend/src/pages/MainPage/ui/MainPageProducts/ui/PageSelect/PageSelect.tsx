/* eslint-disable jsx-a11y/anchor-is-valid */
import { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';

import cls from './PageSelect.module.scss';
import {
   getLimitProducts,
   getPageProductsNum,
   getTotalProducts,
} from '../../../../model/selectors/paginateSelector';
import { Button } from '@/shared/ui/Button';

interface PageSelectProps {
   className?: string;
}

export const PageSelect = memo((props: PageSelectProps) => {
   const { className } = props;
   const [numPage, setNumPage] = useState(1);
   const pageProducts = useSelector(getPageProductsNum);
   const totalProducts = useSelector(getTotalProducts);
   const limitProducts = useSelector(getLimitProducts);

   if (!totalProducts) return;
   const pages = Math.ceil(totalProducts / limitProducts);
   const arr: number[] = [];
   const arrItems = pages < 5 ? pages : 5;

   for (let i = 0; i < arrItems; ) {
      arr[i] = numPage + i;
      i += 1;
   }

   const clickPage = (page: number) => {
      if (page < 3) {
         setNumPage(1);
      } else {
         setNumPage(page - 2);
      }
   };

   const decreasePage = () => {
      setNumPage(numPage - 1);
   };

   const increasePage = () => {
      if (numPage < pages - 4) setNumPage(numPage + 1);
   };

   const modsRightArrow: Mods = {
      [cls.inActive]: numPage > pages - 5,
   };
   const modsLeftArrow: Mods = {
      [cls.inActive]: numPage < 2,
   };

   return (
      <div
         id='container'
         className={classNames(cls.PageSelect, {}, [className])}
      >
         {pages > 6 && (
            <Button
               onClick={decreasePage}
               className={classNames(cls.page, modsLeftArrow, [])}
            >
               &lt;&lt;
            </Button>
         )}
         {arr.map((item) => (
            <Button
               key={item}
               className={classNames(
                  cls.page,
                  { [cls.active]: item === pageProducts },
                  [],
               )}
               onClick={() => clickPage(item)}
            >
               {item}
            </Button>
         ))}
         {pages > 5 && (
            <Button
               disabled={numPage > pages - 5}
               onClick={increasePage}
               className={classNames(cls.page, modsRightArrow, [])}
            >
               &gt;&gt;
            </Button>
         )}
      </div>
   );
});
