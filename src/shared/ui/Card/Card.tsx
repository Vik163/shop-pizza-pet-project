import { type HTMLAttributes, memo, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Card.module.scss';
import { HStack, VStack } from '../Stack';
import { FlexJustify } from '../Stack/Flex';

export enum CardRadius {
   RADIUS_12 = 'radius_12',
   RADIUS_14 = 'radius_14',
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
   className?: string;
   children: ReactNode;
   radius?: CardRadius;
   justify?: FlexJustify;
   horizontal?: boolean;
   id: string;
}

export const Card = memo((props: CardProps) => {
   const {
      className,
      children,
      horizontal,
      justify = FlexJustify.BETWEEN,
      radius = CardRadius.RADIUS_14,
      id,
      ...otherProps
   } = props;

   return horizontal ? (
      <HStack
         className={classNames(cls.Card, {}, [className, cls[radius]])}
         justify={justify}
         {...otherProps}
      >
         {children}
      </HStack>
   ) : (
      <VStack
         id={id}
         className={classNames(cls.Card, {}, [className, cls[radius]])}
         justify={justify}
         {...otherProps}
      >
         {children}
      </VStack>
   );
});
