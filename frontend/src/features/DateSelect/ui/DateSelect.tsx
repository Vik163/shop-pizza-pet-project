import { SyntheticEvent, memo, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import { months } from '@/shared/const/months';

import cls from './DateSelect.module.scss';
import { Button } from '@/shared/ui/Button';
import { HStack } from '@/shared/ui/Stack';
import { Select } from '@/shared/ui/Select';
import { useSelectDays } from '../lib/hooks/useSelectDays/useSelectDays';
import { Birthday, getUserBirthday } from '@/entities/User';

interface DateSelectProps {
   className?: string;
   height?: number;
   width?: number;
   saveValue: (name: string, value: string | Birthday) => void;
   // max?: boolean;
}

export const DateSelect = memo((props: DateSelectProps) => {
   const { className, height, width, saveValue } = props;
   const birthdayData = useSelector(getUserBirthday);
   const [selectData, setSelectData] = useState({
      day: '',
      month: '',
      year: '',
   });
   // готовлю данные в хуке
   const { valueDays, valueYears } = useSelectDays(selectData.day);

   // Если данные пользователя есть, то устанавливаю в selectData
   useEffect(() => {
      if (birthdayData) setSelectData(birthdayData);
   }, [birthdayData]);

   const handleChangeDays = useCallback(
      (selected: string) => {
         setSelectData({ ...selectData, day: selected });
      },
      [selectData],
   );

   const handleChangeMonth = useCallback(
      (selected: string) => {
         setSelectData({ ...selectData, month: selected });
      },
      [selectData],
   );

   const handleChangeYears = useCallback(
      (selected: string) => {
         setSelectData({ ...selectData, year: selected });
      },
      [selectData],
   );

   const sendSelectedData = (e: SyntheticEvent<HTMLButtonElement>) => {
      e.preventDefault();
      // birthday - ключ в объекте User для отправки данных
      saveValue('birthday', selectData);
   };

   // кнопка сохранить отключение и включение.
   const selectedFull = selectData.day && selectData.month && selectData.year;
   const selectedOne =
      birthdayData !== selectData &&
      (selectData.day || selectData.month || selectData.year);
   // если данных пользователя нет, то вкл когда выбраны все поля, если есть при выборе любого поля
   const editButton = birthdayData ? selectedOne : selectedFull;

   // При выборе меняется фон
   const modDays: Mods = {
      [cls.selected]:
         selectData.day !== '' && selectData.day !== birthdayData?.day,
   };
   const modMonth: Mods = {
      [cls.selected]:
         selectData.month !== '' && selectData.month !== birthdayData?.month,
   };
   const modYears: Mods = {
      [cls.selected]:
         selectData.year !== '' && selectData.year !== birthdayData?.year,
   };

   return (
      <div
         style={{ height }}
         className={classNames(cls.select, {}, [className])}
      >
         <HStack style={{ width }} className={cls.selectContainer}>
            <Select
               name='day'
               placeholder={birthdayData?.day || 'День'}
               className={classNames(cls.days, modDays, [])}
               selected={selectData.day}
               options={valueDays}
               onChange={handleChangeDays}
               heightOptionContainer={350}
               // scrollVariant={ScrollbarVariant.SELECT} - по умолчанию в Scrollbar
            />
            <Select
               name='month'
               placeholder={birthdayData?.month || 'Месяц'}
               className={classNames(cls.months, modMonth, [])}
               selected={selectData.month}
               options={months}
               onChange={handleChangeMonth}
               heightOptionContainer={350}
            />
            <Select
               name='year'
               placeholder={birthdayData?.year || 'Год'}
               className={classNames(cls.years, modYears, [])}
               selected={selectData.year}
               options={valueYears}
               onChange={handleChangeYears}
               heightOptionContainer={350}
            />
         </HStack>
         <Button
            name='birthday'
            className={classNames(
               cls.selectEdit,
               { [cls.editActive]: editButton },
               [],
            )}
            onClick={sendSelectedData}
            disabled={Boolean(!editButton)}
         >
            Сохранить
         </Button>
      </div>
   );
});
