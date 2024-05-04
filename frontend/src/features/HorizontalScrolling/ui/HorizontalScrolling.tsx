/* eslint-disable no-param-reassign */
import { useRef, useState } from 'react';
import { useSprings, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './HorizontalScrolling.module.scss';

import { HorizontalScrollingCard } from './HorizontalScrollingCard/HorizontalScrollingCard';
import arrow from '@/shared/assets/icons/arrow.png';
import { ScrollingCards } from '../model/types/scrollingCards';

interface HorizontalScrollingProps {
   className?: string;
   elements: ScrollingCards[];
   curtains?: boolean;
   arrows?: boolean;
   scale?: boolean;
   widthElement: number;
   widthBlock: number;
   heightElement: number;
   heightBlock: number;
   gap: number;
   shadowsOpacity?: number;
   visibleElements?: number;
}

export const HorizontalScrolling = (props: HorizontalScrollingProps) => {
   let { curtains } = props;
   const {
      className,
      elements,
      scale,
      widthElement,
      widthBlock,
      gap,
      heightElement,
      heightBlock,
      shadowsOpacity = 0,
      visibleElements = 2,
   } = props;
   const index = useRef(0);
   // width + gap
   const width = widthElement + gap;
   // половина ширины экрана для определения нужной стрелки
   const widthForArrow = window.innerWidth / 2;

   const [indexActiveCard, setIndexActiveCard] = useState(0);
   const sizeBlock = {
      width: widthBlock + gap,
      height: heightBlock,
   };
   const shiftShadow = shadowsOpacity ? gap / 2 : 0;

   if (curtains && elements.length <= visibleElements) curtains = false;

   // Добавляем длину из-за смешения влево на 1
   const [obj, api] = useSprings(elements.length + 1, (i) => {
      return {
         // Смещаем на один элемент влево
         x: (i - 1) * width + shiftShadow,
         display: 'block',
         scaleElements: 1,
      };
   });

   const bind = useDrag(
      ({ xy, currentTarget, target, active, movement: [mx], cancel }) => {
         // Добавляю рендер для обновления
         const indexIncrease = () => {
            index.current += 1;
            setIndexActiveCard(indexActiveCard + 1);
         };

         const indexDecrease = () => {
            index.current -= 1;
            setIndexActiveCard(indexActiveCard - 1);
         };

         // стрелки. Хардкод mx
         // положение стрелки (х) и нажатие (active)
         if (currentTarget === target) {
            if (curtains) {
               if (xy[0] > widthForArrow && active) {
                  mx = -width;
               } else if (xy[0] < widthForArrow && active) {
                  mx = width;
               } else {
                  mx = 0;
               }
            } else if (xy[0] > widthForArrow && active) {
               mx = -width;
            } else if (xy[0] < widthForArrow && active) {
               mx = width;
            } else {
               mx = 0;
            }
         }
         // перетаскивание.
         // длина массива меньше или равно видимым картам
         if (elements.length <= visibleElements) {
            return;
         }
         if (active && Math.abs(mx) > width / 2) {
            // направление прокрутки вправо  (меняю xDir на mx)
            if (mx > 0) {
               // ограничиваем скролл вправо
               if (curtains) {
                  // curtains - индекс первого элемента (-1)
                  if (indexActiveCard < 0) {
                     cancel();
                     return;
                  }
                  indexDecrease();
               } else {
                  // Не curtains - индекс первого элемента 0
                  if (indexActiveCard <= 0) {
                     cancel();
                     return;
                  }
                  indexDecrease();
               }
               // направление прокрутки влево
            } else {
               // ограничиваем скролл влево
               // eslint-disable-next-line no-lonely-if
               if (curtains) {
                  // curtains - индекс последнего элемента (elements.length - 3 видимых)
                  // countCardsInBlockCurtains - число элементов в блоке + 1 под шторкой
                  const countCardsInBlockCurtains =
                     curtains && Math.round(widthBlock / width);

                  if (
                     indexActiveCard ===
                     elements.length - (countCardsInBlockCurtains + 1)
                  ) {
                     cancel();
                     return;
                  }
                  indexIncrease();
               } else {
                  // Не curtains - индекс последнего элемента elements.length - 4 видимых
                  // countCardsInBlock - число элементов в блоке
                  const countCardsInBlock =
                     !curtains && Math.round(widthBlock / width);
                  if (indexActiveCard === elements.length - countCardsInBlock) {
                     cancel();
                     return;
                  }
                  indexIncrease();
               }
            }
            cancel();
         }

         api.start((i) => {
            // mx !== 0 убираем реагирование на щелчок мыши
            if (mx !== 0) {
               // Масштаб в зависисмости от движения мышкой
               const scaleElementsNum = () => {
                  if (currentTarget === target) {
                     // стрелки не уменьшают
                     return 1;
                  }
                  if (scale && active) {
                     return 1 - Math.abs(mx) / 2600; // 2600 - подбором
                  }
                  return 1;
               };
               const scaleElements = scaleElementsNum();

               // Смещаем на один элемент влево
               const x =
                  ((i - indexActiveCard - 1) * width +
                     shiftShadow +
                     (active ? mx : 0)) *
                  //  растояние между элементами  (уменьшаем scaleElements < 0, увеличиваем > 0)
                  scaleElements;
               return { x, scaleElements };
            }
         });
      },
   );

   // Карты необходимые для корректной работы от 0 до (index.current + n) элемента
   const cardsVisible = obj.filter((item, i) => {
      return i <= indexActiveCard + visibleElements + 1 && i >= indexActiveCard;
   });
   const leftArrowCurtainsActive = curtains && indexActiveCard !== -1;
   const rightArrowCurtainsActive =
      curtains &&
      indexActiveCard !== elements.length - visibleElements - 1 &&
      elements.length >= cardsVisible.length; // если нет боковых
   const rightArrowActive =
      !curtains &&
      cardsVisible.length > visibleElements + 1 &&
      indexActiveCard !== -1; //* вместо >  было !==

   const leftArrowActive = !curtains && indexActiveCard !== 0;

   return (
      <div
         className={classNames(cls.HorizontalScrolling, {})}
         style={sizeBlock}
      >
         <div
            className={classNames(
               cls.curtains,
               { [cls.leftHidden]: !curtains, [cls.leftCurtain]: curtains },
               [],
            )}
            style={{
               width: `calc((100vw - ${widthBlock}px) / 2)`,
               right: widthBlock + (shadowsOpacity ? gap / 2 : gap),
            }}
         >
            {(leftArrowCurtainsActive || leftArrowActive) && (
               <animated.button
                  style={{ backgroundImage: `url(${arrow})` }}
                  className={classNames(
                     cls.icon,
                     {
                        [cls.iconLeft]: !curtains,
                        [cls.iconLeftCurtains]: curtains,
                     },
                     [],
                  )}
                  {...bind()}
               ></animated.button>
            )}
         </div>
         <div
            className={classNames(
               cls.curtains,
               { [cls.rightHidden]: !curtains, [cls.rightCurtain]: curtains },
               [className],
            )}
            style={{
               width: `calc((100vw - ${widthBlock - 20}px) / 2)`,
               left: widthBlock + (shadowsOpacity ? gap / 2 : gap),
            }}
         >
            {(rightArrowCurtainsActive || rightArrowActive) && (
               <animated.button
                  style={{ backgroundImage: `url(${arrow})` }}
                  className={classNames(
                     cls.icon,
                     {
                        [cls.iconRight]: !curtains,
                        [cls.iconRightCurtains]: curtains,
                     },
                     [],
                  )}
                  {...bind()}
               ></animated.button>
            )}
         </div>

         {cardsVisible.map(({ x, display, scaleElements }, i) => (
            <HorizontalScrollingCard
               // eslint-disable-next-line react/no-array-index-key
               key={i}
               x={x}
               display={display}
               scaleElements={scaleElements}
               i={i}
               curtains={curtains}
               widthElement={widthElement}
               elements={elements}
               heightElement={heightElement}
               shadowsOpacity={shadowsOpacity}
               visibleElements={visibleElements}
               indexActiveCard={indexActiveCard}
               bind={bind}
            />
         ))}
      </div>
   );
};
