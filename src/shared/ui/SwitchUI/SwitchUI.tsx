import { memo, useEffect, useRef } from 'react';

import cls from './SwitchUI.module.scss';
import { Text, FontSize, FontWeight, FontColor } from '../Text';
import { classNames } from '@/shared/lib/classNames/classNames';

interface SwitchUIProps {
   className?: string;
   variant: string;
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

export const SwitchUI = memo((props: SwitchUIProps) => {
   const {
      width,
      onToggle,
      isChecked,
      variant,
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

   return (
      <div className={classNames(cls.switchContainer, {}, [className])}>
         <Text
            fontColor={fontColorLabel}
            fontSize={fontSizeLabel}
            fontWeight={fontWeightLabel}
         >
            {labelLeft}
         </Text>
         <div
            className={cls.Switch}
            ref={switchRef}
            onClick={() => onToggle(variant)}
         >
            <label htmlFor={variant} {...otherProps} className={cls.label}>
               <input
                  id={variant}
                  name={variant}
                  value={value}
                  className={variant === 'theme' ? cls.inputTheme : cls.input}
                  type='checkbox'
                  checked={isChecked}
                  readOnly
                  // onChange={(e) => onChangeModel(e)} с readOnly не надо
               />
               <span
                  className={variant === 'theme' ? cls.sliderTheme : cls.slider}
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
