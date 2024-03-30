import { useEffect, useState } from 'react';
import { daysInMonths } from '@/shared/const/months';

export const useSelectDays = (valueMonth: string) => {
   const [valueDays, setValueDays] = useState<string[]>([]);
   const nowYear = new Date().getFullYear();
   const valueYears = [];

   // числа в зависимости от месяца
   useEffect(() => {
      let day: number;
      if (!valueMonth) {
         day = 31;
      } else if (daysInMonths[28].includes(valueMonth)) {
         day = 29;
      } else if (daysInMonths[30].includes(valueMonth)) {
         day = 30;
      } else {
         day = 31;
      }

      const days = () => {
         const arrDays = [];
         for (let i = 1; i <= day; i += 1) {
            arrDays.push(String(i));
         }
         return arrDays;
      };

      setValueDays(days);
   }, [valueMonth]);

   // годы
   for (let i = nowYear; i > 1930; ) {
      valueYears.push(String(i));
      i -= 1;
   }

   return { valueDays, valueYears };
};
