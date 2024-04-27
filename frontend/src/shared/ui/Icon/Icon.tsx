import React, { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Icon.module.scss';

type SvgProps = React.SVGProps<SVGSVGElement>;

interface IconProps extends SvgProps {
   className?: string;
   Svg?: React.VFC<React.SVGProps<SVGSVGElement>>;
   src?: string;
}

export const Icon = memo((props: IconProps) => {
   const { className, Svg, width, height, src, ...otherProps } = props;

   const icon = Svg ? (
      <Svg
         className={classNames(cls.Icon, {}, [className])}
         width={width}
         height={height}
         {...otherProps}
      />
   ) : (
      <img
         src={src}
         className={classNames(cls.Icon, {}, [className])}
         width={width}
         height={height}
         alt='иконка'
      />
   );

   return icon;
});
