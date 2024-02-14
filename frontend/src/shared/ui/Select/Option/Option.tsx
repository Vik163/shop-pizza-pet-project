import { type MouseEventHandler, useEffect, useRef, useState } from 'react';
import cls from './Option.module.scss';

interface OptionProps {
   value: string;
   onClick: (value: string) => void;
   hoverOptionColor?: string;
}
export const Option = (props: OptionProps) => {
   const { value, onClick, hoverOptionColor } = props;
   const optionRef = useRef<HTMLLIElement>(null);
   const [isHover, setIsHover] = useState(false);

   const mouseEnter = () => {
      setIsHover(true);
   };

   const mouseLeave = () => {
      setIsHover(false);
   };

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
      (clickedValue: string): MouseEventHandler<HTMLLIElement> =>
      () => {
         onClick(clickedValue);
      };

   return (
      <li
         className={cls.option}
         style={{ backgroundColor: isHover ? `${hoverOptionColor}` : '' }}
         onMouseEnter={mouseEnter}
         onMouseLeave={mouseLeave}
         value={value}
         onClick={handleClick(value)}
         tabIndex={0}
         ref={optionRef}
      >
         {value}
      </li>
   );
};
