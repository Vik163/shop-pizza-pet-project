import { memo, useEffect, useRef, useState } from 'react';

import cls from './Switch.module.scss';

interface SwitchProps {
   className?: string;
   htmlFor?: string;
   width: number;
}

export const Switch = memo((props: SwitchProps) => {
   const { width, htmlFor, ...otherProps } = props;
   const [isToggled, setIsToggled] = useState(true);
   const switchRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      if (switchRef.current && width)
         switchRef.current.style.setProperty('--switch', `${width}px`);
   }, [width, switchRef]);

   const onToggle = () => setIsToggled(!isToggled);

   return (
      <div ref={switchRef} className={cls.Switch}>
         <label htmlFor={htmlFor} {...otherProps} className={cls.label}>
            <input
               className={cls.input}
               type='checkbox'
               checked={isToggled}
               onChange={onToggle}
            />
            <span className={cls.slider}></span>
         </label>
      </div>
   );
});
