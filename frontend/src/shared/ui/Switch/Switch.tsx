import { memo, useEffect, useRef } from 'react';

import cls from './Switch.module.scss';

interface SwitchProps {
   className?: string;
   htmlFor?: string;
   width: number;
   onToggle: () => void;
   isChecked: boolean;
}

export const Switch = memo((props: SwitchProps) => {
   const { width, onToggle, isChecked, htmlFor, ...otherProps } = props;
   const switchRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      if (switchRef.current && width)
         switchRef.current.style.setProperty('--switch', `${width}px`);
   }, [width, switchRef]);

   return (
      <div ref={switchRef} className={cls.Switch}>
         <label htmlFor={htmlFor} {...otherProps} className={cls.label}>
            <input
               className={cls.input}
               type='checkbox'
               checked={isChecked}
               onChange={() => onToggle()}
            />
            <span className={cls.slider}></span>
         </label>
      </div>
   );
});
