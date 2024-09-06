import { type MouseEventHandler, useEffect, useRef } from 'react';
import cls from './Option.module.scss';

interface OptionProps {
   value: string;
   onClick: (value: string) => void;
}
export const Option = (props: OptionProps) => {
   const { value, onClick } = props;
   const optionRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      const option = optionRef.current;
      if (!option) return;

      const handleEnterPress = (event: KeyboardEvent) => {
         if (document.activeElement === option && event.key === 'Enter') {
            onClick(value);
         }
      };

      option.addEventListener('keydown', handleEnterPress);

      return () => {
         option.removeEventListener('keydown', handleEnterPress);
      };
   }, [value, onClick]);

   const handleClick =
      (clickedValue: string): MouseEventHandler<HTMLDivElement> =>
      () => {
         onClick(clickedValue);
      };

   return (
      <div
         className={cls.option}
         // value={value}
         onClick={handleClick(value)}
         // tabIndex={0}
         ref={optionRef}
      >
         {value}
      </div>
   );
};
