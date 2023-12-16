import { useEffect, useState } from 'react';
import { daysInMonths } from '@/shared/const/months';

export const useSelectDays = (valueMonth: string) => {
   const [valueDays, setValueDays] = useState<string[]>([]);

   useEffect(() => {
      let day: number;
      if (!valueMonth) {
         day = 31;
      } else {
         if (daysInMonths[28].includes(valueMonth)) {
            day = 29;
         } else if (daysInMonths[30].includes(valueMonth)) {
            day = 30;
         } else {
            day = 31;
         }
      }

      const days = () => {
         const arrDays = [];
         for (let i = 1; i <= day; i++) {
            arrDays.push(String(i));
         }
         return arrDays;
      };

      setValueDays(days);
   }, [valueMonth]);

   return { valueDays };
};
