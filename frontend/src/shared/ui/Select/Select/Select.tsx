import {
   type MouseEventHandler,
   memo,
   useCallback,
   useEffect,
   useRef,
   useState,
} from 'react';
import { type Mods, classNames } from '@/shared/lib/classNames/classNames';

import cls from './Select.module.scss';

import { Option } from '../Option/Option';
import ArrowDown from '@/shared/assets/icons/arrowDown.svg';
import { Scrollbar } from '../../Scrollbar/Scrollbar';

interface SelectProps {
   className?: string;
   selected?: string | null;
   heightOptionContainer: string | number;
   options: string[];
   hoverOptionColor: string;
   placeholder?: string;
   mode?: 'rows' | 'cells';
   onChange?: (selected: string) => void;
   onClose?: () => void;
   scrollArrows?: boolean;
   scrollThumbColor?: string;
   scrollThumbBorder?: string;
   scrollWidth?: string | number;
   scrollTrackColor?: string;
   scrollRadius?: string | number;
   scrollHover?: boolean;
}

export const Select = memo((props: SelectProps) => {
   const {
      mode = 'rows',
      options,
      placeholder,
      selected,
      className,
      heightOptionContainer,
      onChange,
      onClose,
      scrollArrows,
      scrollThumbBorder,
      scrollThumbColor,
      scrollWidth,
      scrollTrackColor,
      scrollHover,
      hoverOptionColor,
      scrollRadius,
   } = props;
   const [isOpen, setIsOpen] = useState<boolean>(false);
   const [isTopScreen, setIsTopScreen] = useState<boolean>(false);
   const [isTransition, setIsTransition] = useState<boolean>(false);
   const rootRef = useRef<HTMLDivElement>(null);
   const placeholderRef = useRef<HTMLDivElement>(null);
   const timeOutRef = useRef<ReturnType<typeof setTimeout>>();

   // Клавиатура
   useEffect(() => {
      const placeholderEl = placeholderRef.current;
      if (!placeholderEl) return;

      const handleClick = (event: KeyboardEvent) => {
         if (event.key === 'Enter') {
            setIsOpen((prev) => !prev);
         }
      };

      placeholderEl.addEventListener('keydown', handleClick);

      return () => {
         placeholderEl.removeEventListener('keydown', handleClick);
      };
   }, []);

   useEffect(() => {
      const handleClick = (event: MouseEvent) => {
         // положение всплывающего окна
         setIsTopScreen(event.clientY < window.innerHeight / 2);

         const { target } = event;
         if (isOpen) {
            timeOutRef.current = setTimeout(() => {
               setIsTransition(true);
            }, 10);
         }

         if (target instanceof Node && !rootRef.current?.contains(target)) {
            isOpen && onClose?.();
            setIsOpen(false);
            setIsTransition(false);
         }
      };

      window.addEventListener('click', handleClick);

      return () => {
         window.removeEventListener('click', handleClick);
         clearTimeout(timeOutRef.current);
      };
   }, [isOpen, onClose]);

   const handleOptionClick = useCallback((value: string) => {
      setIsOpen(false);
      onChange?.(value);
   }, []);

   const handlePlaceHolderClick: MouseEventHandler<HTMLDivElement> =
      useCallback(() => {
         setIsOpen((prev) => !prev);
      }, []);

   const mods: Mods = {
      [cls.selectOpen]: isTransition,
      [cls.selectOpenTop]: isTopScreen,
      [cls.selectOpenBottom]: !isTopScreen,
   };

   return (
      <div
         className={classNames(cls.selectWrapper, {}, [className])}
         ref={rootRef}
      >
         <div
            className={cls.placeholder}
            ref={placeholderRef}
            onClick={handlePlaceHolderClick}
            role='button'
            tabIndex={0}
         >
            {selected || placeholder}
            <div className={cls.arrow}>
               <ArrowDown />
            </div>
         </div>
         {isOpen && (
            <Scrollbar
               className={classNames(cls.select, mods, [])}
               heightOptionContainer={heightOptionContainer}
               scrollArrows={scrollArrows}
               scrollTrackColor={scrollTrackColor}
               scrollThumbColor={scrollThumbColor}
               scrollThumbBorder={scrollThumbBorder}
               scrollWidth={scrollWidth}
               scrollRadius={scrollRadius}
               scrollHover={scrollHover}
            >
               {options.map((option) => (
                  <Option
                     key={option}
                     value={option}
                     onClick={handleOptionClick}
                     hoverOptionColor={hoverOptionColor}
                  />
               ))}
            </Scrollbar>
         )}
      </div>
   );
});
