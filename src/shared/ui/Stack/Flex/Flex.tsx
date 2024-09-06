import {
   type DetailedHTMLProps,
   type HTMLAttributes,
   type ReactNode,
} from 'react';
import { type Mods, classNames } from '@/shared/lib/classNames/classNames';

import cls from './Flex.module.scss';

export enum FlexJustify {
   START = 'start',
   END = 'end',
   CENTER = 'center',
   BETWEEN = 'between',
}
export enum FlexAlign {
   START = 'start',
   END = 'end',
   CENTER = 'center',
}
export enum FlexDirection {
   ROW = 'row',
   COLUMN = 'column',
}
export enum FlexWrap {
   NOWRAP = 'nowrap',
   WPAP = 'wrap',
}

const justifyClasses: Record<FlexJustify, string> = {
   start: cls.justifyStart,
   end: cls.justifyEnd,
   center: cls.justifyCenter,
   between: cls.justifyBetween,
};

const directionClasses: Record<FlexDirection, string> = {
   row: cls.directionRow,
   column: cls.directionColumn,
};

const alignClasses: Record<FlexAlign, string> = {
   start: cls.alignStart,
   center: cls.alignCenter,
   end: cls.alignEnd,
};

const wrapClasses: Record<FlexWrap, string> = {
   nowrap: cls.wrapNowrap,
   wrap: cls.wrapWrap,
};

type DivProps = DetailedHTMLProps<
   HTMLAttributes<HTMLDivElement>,
   HTMLDivElement
>;

export interface FlexProps extends DivProps {
   children: ReactNode;
   className?: string;
   justify?: FlexJustify;
   direction?: FlexDirection;
   align?: FlexAlign;
   wrap?: FlexWrap;
   max?: boolean;
   maxHeight?: boolean;
   gap?: number;
}

export const Flex = (props: FlexProps) => {
   const {
      className,
      children,
      justify = FlexJustify.START,
      direction = FlexDirection.ROW,
      wrap = FlexWrap.NOWRAP,
      align = FlexAlign.CENTER,
      max,
      gap,
      maxHeight,
      ...otherProps
   } = props;

   const classes = [
      className,
      justifyClasses[justify],
      directionClasses[direction],
      wrapClasses[wrap],
      alignClasses[align],
   ];

   const mods: Mods = {
      [cls.max]: max,
      [cls.maxHeight]: maxHeight,
   };

   return (
      <div
         style={{ gap }}
         className={classNames(cls.Flex, mods, classes)}
         {...otherProps}
      >
         {children}
      </div>
   );
};
