import { ChangeEvent, memo, useEffect, useRef } from 'react';

import cls from './Switch.module.scss';
import { Text, FontSize, FontWeight, FontColor } from '../Text';
import { classNames } from '@/shared/lib/classNames/classNames';

interface SwitchProps {
   className?: string;
   htmlFor?: string;
   width: number;
   onToggle: (id: string) => void;
   labelLeft?: string;
   labelRight?: string;
   isChecked: boolean;
   fontSizeLabel?: FontSize;
   fontWeightLabel?: FontWeight;
   fontColorLabel?: FontColor;
   value?: string;
}

export const Switch = memo((props: SwitchProps) => {
   const {
      width,
      onToggle,
      isChecked,
      htmlFor,
      className,
      fontSizeLabel,
      fontWeightLabel,
      fontColorLabel,
      labelLeft,
      labelRight,
      value,
      ...otherProps
   } = props;
   const switchRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      if (switchRef.current && width)
         switchRef.current.style.setProperty('--switch', `${width}px`);
   }, [width, switchRef]);

   const onChangeModel = (e: ChangeEvent<HTMLInputElement>) => {
      onToggle(e.target.id);
   };

   return (
      <div className={classNames(cls.switchContainer, {}, [className])}>
         <Text
            fontColor={fontColorLabel}
            fontSize={fontSizeLabel}
            fontWeight={fontWeightLabel}
         >
            {labelLeft}
         </Text>
         <div className={cls.Switch} ref={switchRef}>
            <label htmlFor={htmlFor} {...otherProps} className={cls.label}>
               <input
                  id={htmlFor}
                  name={htmlFor}
                  value={value}
                  className={htmlFor === 'theme' ? cls.inputTheme : cls.input}
                  type='checkbox'
                  checked={isChecked}
                  onChange={(e) => onChangeModel(e)}
               />
               <span
                  className={htmlFor === 'theme' ? cls.sliderTheme : cls.slider}
               ></span>
            </label>
         </div>
         <Text
            fontColor={fontColorLabel}
            fontSize={fontSizeLabel}
            fontWeight={fontWeightLabel}
         >
            {labelRight}
         </Text>
      </div>
   );
});
