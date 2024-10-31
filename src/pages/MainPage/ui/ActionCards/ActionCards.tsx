import { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './ActionCards.module.scss';
import {
   HorizontalScrolling,
   ScrollingCards,
} from '@/features/HorizontalScrolling';
import { getMainPageIsLoading } from '../../model/selectors/mainPageSelectors';
import { HStack } from '@/shared/ui/Stack';
import { Skeleton } from '@/shared/ui/Sceleton/Skeleton';
import { getActions } from '../../../../entities/Action/model/selectors/actionsSelector';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { fetchActions } from '../../../../entities/Action/model/services/fetchActions';
import { useResize } from '@/shared/lib/hooks/useResize';

interface ActionCardsProps {
   className?: string;
}

export const ActionCards = memo((props: ActionCardsProps) => {
   const { className } = props;
   const dispatch = useAppDispatch();
   const actions = useSelector(getActions);
   const isLoading = useSelector(getMainPageIsLoading);
   const actionsScrolling = actions as ScrollingCards[];
   const [sizesCard, setSizesCard] = useState({
      width: 540,
      height: 312,
      gap: 30,
      widthBlock: 1110,
      heightBlock: 372,
   });
   const { isMobile } = useResize();

   useEffect(() => {
      dispatch(fetchActions());
   }, [dispatch]);

   useEffect(() => {
      if (isMobile) {
         setSizesCard({
            width: 213,
            height: 124,
            gap: 12,
            widthBlock: 300,
            heightBlock: 184,
         });
      } else {
         setSizesCard({
            width: 540,
            height: 312,
            gap: 30,
            widthBlock: 1110,
            heightBlock: 372,
         });
      }
   }, [isMobile]);

   const actionsSkeleton = (
      <HStack gap={sizesCard.gap} className={cls.ActionCardsSkeleton}>
         <Skeleton
            width={sizesCard.width}
            height={sizesCard.height}
            border='14px'
         />
         <Skeleton
            width={sizesCard.width}
            height={sizesCard.height}
            border='14px'
         />
      </HStack>
   );

   return (
      <div className={classNames(cls.ActionCards, {}, [className])}>
         {isLoading
            ? actionsSkeleton
            : actionsScrolling && (
                 <HorizontalScrolling
                    elements={actionsScrolling}
                    curtains
                    scale
                    widthBlock={sizesCard.widthBlock}
                    heightBlock={sizesCard.heightBlock}
                    widthElement={sizesCard.width}
                    heightElement={sizesCard.height}
                    gap={sizesCard.gap}
                    shadowsOpacity={0.26}
                 />
              )}
      </div>
   );
});
