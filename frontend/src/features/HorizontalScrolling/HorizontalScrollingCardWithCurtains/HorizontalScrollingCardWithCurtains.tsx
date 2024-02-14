import { memo } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";

import cls from "./HorizontalScrollingCardWithCurtains.module.scss";
// eslint-disable-next-line ulbi-tv-plugin/layer-imports
import { CardNewProduct } from "@/features/CardNewProduct";
import { ProductFixPrice } from "@/entities/Product";

interface HorizontalScrollingCardWithCurtainsProps {
   card: ProductFixPrice | string;
   curtains?: boolean;
   widthElement: number;
   heightElement: number;
   imageCard: ProductFixPrice | string;

}

export const HorizontalScrollingCardWithCurtains = memo((props: HorizontalScrollingCardWithCurtainsProps) => {
  const { 
    curtains,
    widthElement,
    heightElement,
    imageCard,
    card
 } = props;



  return <div className={classNames(cls.HorizontalScrollingCardWithCurtains, {}, [])}>
    {
               curtains ? (
                  <div
                     className={cls.Card}
                     style={{ width: widthElement, height: heightElement }}
                  >
                     <div
                        style={{
                           backgroundImage: `url(${imageCard})`,
                        }}
                     />
                  </div>
               ) : (
                  typeof card !== 'string' && (
                     <CardNewProduct className={cls.Card} card={card}>
                        <div
                           style={{
                              backgroundImage: `url(${imageCard})`,
                           }}
                        />
                     </CardNewProduct>
                  )
               )
            }
  </div>;
});
