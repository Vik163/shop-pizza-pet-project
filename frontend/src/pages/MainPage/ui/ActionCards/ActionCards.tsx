import { memo } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './ActionCards.module.scss';
import { HorizontalScrolling } from '@/features/HorizontalScrolling';
import { getMainPageActions } from '../../model/selectors/mainPageSelectors';

interface ActionCardsProps {
   className?: string;
}

export const ActionCards = memo((props: ActionCardsProps) => {
   const { className } = props;
   const actions = useSelector(getMainPageActions);

   return (
      <div className={classNames(cls.ActionCards, {}, [className])}>
         {actions && (
            <HorizontalScrolling
               elements={actions}
               curtains
               scale
               widthBlock={1110}
               heightBlock={372}
               widthElement={540}
               heightElement={312}
               gap={30}
               shadowsOpacity={0.26}
            />
         )}
      </div>
   );
});
