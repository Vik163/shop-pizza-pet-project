import { useRef, useState } from 'react';
import { useSprings, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './HorizontalScrolling.module.scss';

import { type ProductFixPrice } from '@/entities/Product';
import { HorizontalScrollingCard } from './HorizontalScrollingCard/HorizontalScrollingCard';
import arrow from '@/shared/assets/icons/arrow.png';

interface HorizontalScrollingProps {
   className?: string;
   elements: ProductFixPrice[] | string[];
   imageSmall?: boolean;
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
   const {
      className,
      elements,
      imageSmall,
      curtains,
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
   const [indexActiveCard, setIndexActiveCard] = useState(0);
   const sizeBlock = {
      width: widthBlock + gap,
      height: heightBlock,
   };

   // Добавляем длину из-за смешения влево на 1
   const [obj, api] = useSprings(elements.length + 1, (i) => {
      return {
         // Смещаем на один элемент влево
         x: (i - 1) * width + gap / 2,
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
               if (xy[0] > width / 2 && active) {
                  mx = -width;
               } else if (xy[0] < width / 2 && active) {
                  mx = width;
               } else {
                  mx = 0;
               }
            } else if (xy[0] > width && active) {
               mx = -width;
            } else if (xy[0] < width && active) {
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
                     gap / 2 +
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
   const leftArrowCurtainsActive = indexActiveCard !== -1;
   const rightArrowCurtainsActive = indexActiveCard !== visibleElements + 2;
   const rightArrowActive =
      cardsVisible.length > visibleElements + 1 && indexActiveCard !== -1; //* вместо >  было !==

   const leftArrowActive = indexActiveCard !== 0;

   return (
      <div
         className={classNames(cls.HorizontalScrolling, {
            [cls.hidden]: !curtains,
         })}
         style={sizeBlock}
      >
         <div
            className={classNames(
               cls.curtains,
               { [cls.leftHidden]: !curtains },
               [cls.leftCurtain],
            )}
            style={{
               width: `calc((100vw - ${widthBlock}px) / 2)`,
               right: widthBlock + gap / 2,
            }}
         >
            {curtains && leftArrowCurtainsActive && (
               <animated.button
                  style={{ backgroundImage: `url(${arrow})` }}
                  className={classNames(cls.icon, {}, [cls.iconLeftCurtain])}
                  {...bind()}
               ></animated.button>
            )}
         </div>
         <div
            className={classNames(
               cls.curtains,
               { [cls.rightHidden]: !curtains },
               [className, cls.rightCurtain],
            )}
            style={{
               width: `calc((100vw - ${widthBlock - 20}px) / 2)`,
               left: widthBlock + gap / 2,
            }}
         >
            {curtains && rightArrowCurtainsActive && (
               <animated.button
                  style={{ backgroundImage: `url(${arrow})` }}
                  className={classNames(cls.icon, {}, [cls.iconRightCurtain])}
                  {...bind()}
               ></animated.button>
            )}
         </div>
         <div>
            {!curtains && leftArrowActive && (
               <div
                  className={classNames(cls.iconBlock, {}, [cls.iconLeft])}
                  style={{
                     height: heightBlock,
                  }}
               >
                  <animated.button
                     style={{ backgroundImage: `url(${arrow})` }}
                     className={classNames(cls.icon, {}, [cls.iconInverse])}
                     {...bind()}
                  ></animated.button>
               </div>
            )}
            {!curtains && rightArrowActive && (
               <div
                  className={classNames(cls.iconBlock, {}, [cls.iconRight])}
                  style={{
                     height: heightBlock,
                  }}
               >
                  <animated.button
                     style={{ backgroundImage: `url(${arrow})` }}
                     className={classNames(cls.icon, {}, [cls.iconInverse])}
                     {...bind()}
                  ></animated.button>
               </div>
            )}
         </div>
         {cardsVisible.map(({ x, display, scaleElements }, i) => (
            <HorizontalScrollingCard
               key={i}
               x={x}
               display={display}
               scaleElements={scaleElements}
               i={i}
               imageSmall={imageSmall}
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
