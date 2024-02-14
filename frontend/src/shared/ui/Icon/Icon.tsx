import React, { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Icon.module.scss';

type SvgProps = Omit<React.SVGProps<SVGSVGElement>, 'onClick'>;

interface IconBaseProps extends SvgProps {
   className?: string;
   Svg?: React.VFC<React.SVGProps<SVGSVGElement>>;
   src?: string;
}

interface NoneClicableIconProps extends IconBaseProps {
   clickable?: false;
}

interface ClicableBaseProps extends IconBaseProps {
   clickable?: true;
   onClick: () => void;
}
type IconProps = NoneClicableIconProps | ClicableBaseProps;

export const Icon = memo((props: IconProps) => {
   const {
      className,
      Svg,
      width = 32,
      height = 32,
      clickable,
      src,
      ...otherProps
   } = props;

   const icon = Svg ? (
      <Svg
         className={classNames(cls.Icon, {}, [className])}
         width={width}
         height={height}
         onClick={undefined}
         {...otherProps}
      />
   ) : (
      <img
         src={src}
         className={classNames(cls.Icon, {}, [className])}
         width={width}
         height={height}
         onClick={undefined}
         alt='иконка'
      />
   );

   if (clickable) {
      return (
         <button
            type='button'
            className={cls.button}
            style={{ height, width }}
            onClick={props.onClick}
         >
            {icon}
         </button>
      );
   }
   return icon;
});
