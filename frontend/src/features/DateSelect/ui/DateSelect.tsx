import { memo, useCallback, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { months } from '@/shared/const/months';

import cls from './DateSelect.module.scss';
import { Button } from '@/shared/ui/Button';
import { HStack } from '@/shared/ui/Stack';
import { Select } from '@/shared/ui/Select';
import { useSelectDays } from '../lib/hooks/useSelectDays/useSelectDays';

interface DateSelectProps {
   className?: string;
   height?: number;
   width?: number;
   max?: boolean;
}

export const DateSelect = memo((props: DateSelectProps) => {
   const { className, height, width, max } = props;
   const [value, setValue] = useState('');
   const [isValue, setIsValue] = useState(false);
   const [selectDay, setSelectDay] = useState('');
   const [selectMonth, setSelectMonth] = useState('');

   const { valueDays } = useSelectDays(selectMonth);

   const handleChangeDays = useCallback((selected: string) => {
      setSelectDay(selected);
   }, []);

   const handleChangeMonths = useCallback((selected: string) => {
      setSelectMonth(selected);
   }, []);

   const modsInput = {
      // [cls.withValue]: isValue,
      [cls.editActive]: selectDay && selectMonth,
   };

   return (
      <div
         style={{ height }}
         className={classNames(cls.select, {}, [className])}
      >
         <HStack style={{ width }} className={cls.selectContainer}>
            <Select
               placeholder='День'
               className={cls.days}
               selected={selectDay}
               options={valueDays}
               onChange={handleChangeDays}
               scrollWidth={14}
               scrollTrackColor='transparent'
               scrollThumbBorder='3px solid transparent'
               scrollThumbColor='var(--color-input-edit)'
               scrollRadius={12}
               scrollHover
               hoverOptionColor='var(--color-bg-hover)'
               heightOptionContainer={350}
            />
            <Select
               placeholder='Месяц'
               className={cls.months}
               selected={selectMonth}
               options={months}
               onChange={handleChangeMonths}
               hoverOptionColor='var(--color-bg-hover)'
               heightOptionContainer={340}
            />
         </HStack>
         <Button className={classNames(cls.selectEdit, modsInput, [])}>
            Сохранить
         </Button>
      </div>
   );
});
