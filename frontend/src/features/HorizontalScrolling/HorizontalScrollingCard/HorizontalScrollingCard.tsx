import { type ReactNode, memo } from 'react';
import { type SpringValue, animated } from '@react-spring/web';
import { ReactDOMAttributes } from '@use-gesture/react/dist/declarations/src/types';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './HorizontalScrollingCard.module.scss';
import { type ProductFixPrice } from '@/entities/Product';
import { HorizontalScrollingCardWithCurtains } 
from '../HorizontalScrollingCardWithCurtains/HorizontalScrollingCardWithCurtains';

interface HorizontalScrollingCardProps {
   className?: string;
   x: SpringValue<number>;
   display: SpringValue<string>;
   scaleElements: SpringValue<number>;
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   bind: (...args: any[]) => ReactDOMAttributes;
   i: number;
   imageSmall?: boolean;
   curtains?: boolean;
   widthElement: number;
   heightElement: number;
   shadowsOpacity?: number;
   visibleElements?: number;
   children?: ReactNode;
   elements: ProductFixPrice[] | string[];
   indexActiveCard: number;
}

export const HorizontalScrollingCard = memo(
   (props: HorizontalScrollingCardProps) => {
      const {
         x,
         scaleElements,
         i,
         imageSmall,
         curtains,
         widthElement,
         elements,
         indexActiveCard,
         heightElement,
         shadowsOpacity = 0,
         visibleElements = 2,
         bind,
      } = props;
      // const [mouseMoveX, setMouseMoveX] = useState(0);

      // индекс каждой карточки независимо от индекса массива cards
      // добавляются пустые карточки
      // если со шторками и index.current < 0, то приравнивается к (i)
      const indexCardNum  = () => {
         if(curtains) {
            if(indexActiveCard < 0) {
               return i
            } 
            return i + indexActiveCard} 
        return i + indexActiveCard - 1;}

        const indexCard = indexCardNum()

      // масштаб Y подбором 
      const hideSidesScaleYElements =
         (i === 0 && indexActiveCard === 0 && 0.89) ||
         (i === 0 && indexActiveCard + 1 && 0.89) ||
         (i === visibleElements && indexActiveCard === -1 && 0.89) ||
         (i >= 0 && i <= visibleElements && scaleElements) ||
         (i === visibleElements + 1 && 0.89) ||
         1;

      // тени
      const shadowElements =
         i > visibleElements && indexActiveCard > elements.length - 4
            ? 0
            : shadowsOpacity;

      const styleShadow = `0 0 24px 0 rgba(0, 0, 0, ${shadowElements})`;
      const scaleY = curtains ? hideSidesScaleYElements : 1;
      const scaleX = curtains ? scaleElements : 1;
      const card =
         indexCard > -1 && indexCard < elements.length && elements[indexCard];
      if (!card) return;
      

      // const clickCard = (e: MouseEvent) => {
      //    if (e.clientX == mouseMoveX) {
      //       console.log('yes');
      //    }
      // };

      // const clickDownMouse = (e: MouseEvent) => {
      //    setMouseMoveX(e.clientX);
      // };

      // определяю что приходит в массиве по типу и выбираю нужное
      const imageCardFun = () => {
       if (typeof card !== 'string') {
            if(imageSmall) {
              return card.imageSmall
             } 
               return card.image 
             
            } 
           return elements[indexCard];
         }
      const imageCard = imageCardFun()

      return (
         // Блок с затененными краями */
         <animated.div
            className={classNames(cls.cards)}
            {...bind()}
            key={i}
            // onClick={(e) => clickCard(e)}
            // onMouseDown={(e) => { clickDownMouse(e); }}
            style={{
               boxShadow: styleShadow,
               width: widthElement,
               height: heightElement,
               x,
               scaleY,
               scaleX,
            }}
            // eslint-disable-next-line react/no-children-prop
            children={
               <HorizontalScrollingCardWithCurtains 
               card={card}
               curtains={curtains}
               widthElement={widthElement}
               heightElement={heightElement}
               imageCard={imageCard}
               />
               // curtains ? (
               //    <div
               //       className={cls.Card}
               //       style={{ width: widthElement, height: heightElement }}
               //    >
               //       <div
               //          style={{
               //             backgroundImage: `url(${imageCard})`,
               //          }}
               //       />
               //    </div>
               // ) : (
               //    typeof card !== 'string' && (
               //       <CardNewProduct className={cls.Card} card={card}>
               //          <div
               //             style={{
               //                backgroundImage: `url(${imageCard})`,
               //             }}
               //          />
               //       </CardNewProduct>
               //    )
               // )
            }
         />
      );
   },
);
