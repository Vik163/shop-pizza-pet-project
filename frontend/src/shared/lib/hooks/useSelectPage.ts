import { useState } from 'react';

interface SelectPageResult {
   togglePage: (saveAction: (page: number) => void, page: number) => void;
   decreasePage: () => void;
   increasePage: () => void;
   pages: number;
}

export const useSelectPage = (
   totalProducts: number,
   limitProducts: number,
): SelectPageResult => {
   const [numPage, setNumPage] = useState(1);

   const pages = Math.ceil(totalProducts / limitProducts);
   const arr: number[] = [];
   const arrItems = pages < 5 ? pages : 5;

   for (let i = 0; i < arrItems; ) {
      arr[i] = numPage + i;
      i += 1;
   }
   const togglePage = (saveAction: (page: number) => void, page: number) => {
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

   return { togglePage, decreasePage, increasePage, pages };
};
