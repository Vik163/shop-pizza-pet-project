import { memo } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './NewProducts.module.scss';
import { HorizontalScrolling } from '@/features/HorizontalScrolling';
import {
   HeaderTagType,
   Text,
   TextAlign,
   FontColor,
   FontSize,
   FontWeight,
} from '@/shared/ui/Text';
import { getMainPagePopularProducts } from '../../model/selectors/mainPageSelectors';

export const NewProducts = memo(() => {
   const popularProducts = useSelector(getMainPagePopularProducts);

   return (
      popularProducts && (
         <div className={cls.NewProducts}>
            <Text
               className={classNames(cls.titleNewProduct)}
               title={HeaderTagType.H_3}
               fontColor={FontColor.TEXT_PRIMARY}
               fontSize={FontSize.SIZE_24}
               fontWeight={FontWeight.TEXT_700}
               align={TextAlign.TEXT_LEFT}
               max
            >
               Новинки
            </Text>

            <HorizontalScrolling
               elements={popularProducts}
               widthBlock={1110}
               heightBlock={108}
               widthElement={255}
               heightElement={99}
               gap={30}
               shadowsOpacity={0.06}
               visibleElements={4}
            />
         </div>
      )
   );
});
