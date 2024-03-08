import { memo } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './ActionCards.module.scss';
import { HorizontalScrolling } from '@/features/HorizontalScrolling';
import MainImage1 from '@/shared/assets/images/image_1.jpg';
import MainImage2 from '@/shared/assets/images/image_2.jpg';
import MainImage3 from '@/shared/assets/images/image_3.jpg';
import { getMainPageActions } from '../../model/selectors/mainPageSelectors';

interface ActionCardsProps {
   className?: string;
}

const arrComp = [
   MainImage3,
   MainImage1,
   MainImage2,
   MainImage3,
   MainImage1,
   MainImage2,
   MainImage3,
];

export const ActionCards = memo((props: ActionCardsProps) => {
   const { className } = props;
   const actions = useSelector(getMainPageActions);
   console.log('cards:', actions);

   return (
      <div className={classNames(cls.ActionCards, {}, [className])}>
         <HorizontalScrolling
            elements={arrComp}
            curtains
            scale
            widthBlock={1110}
            heightBlock={372}
            widthElement={540}
            heightElement={312}
            gap={30}
            shadowsOpacity={0.26}
         />
      </div>
   );
});
