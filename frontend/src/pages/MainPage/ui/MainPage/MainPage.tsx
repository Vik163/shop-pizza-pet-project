import { memo, useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './MainPage.module.scss';
import { Page } from '@/widgets/Page';

import MainImage1 from '@/shared/assets/images/image_1.jpg';
import MainImage2 from '@/shared/assets/images/image_2.jpg';
import MainImage3 from '@/shared/assets/images/image_3.jpg';
import Man from '@/shared/assets/images/man.png';
import Woman from '@/shared/assets/images/woman.png';

import { HorizontalScrolling } from '@/features/HorizontalScrolling';
import {
   HeaderTagType,
   Text,
   TextAlign,
   FontColor,
   FontSize,
   FontWeight,
} from '@/shared/ui/Text';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useProductsFilters } from '../../lib/hooks/useProductsFilter';
import { ProductView } from '@/entities/Product';
import { fetchViewProducts } from '../../model/services/fetchViewProducts';
import { DeliveryPay } from '../DeliveryPay/DeliveryPay';
import { MainPageProducts } from '../MainPageProducts/MainPageProducts';

interface MainPageProps {
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

export const MainPage = memo((props: MainPageProps) => {
   const { className } = props;
   const dispatch = useAppDispatch();
   const { pathname } = useLocation();
   const { onChangeView } = useProductsFilters();

   // const [cards, setCards] = useState<Products>([]);
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const [sizePizza, setSizePizza] = useState<string>('average');
   // console.log('cards:', cards);

   // const a = async () => {
   //    const response = await axios.get<Product[]>(
   //       'https://pizzashop163.ru/api/pizzas',
   //       {
   //          withCredentials: true,
   //       },
   //    );
   //    if (!response.data) {
   //       throw new Error();
   //    }
   //    setCards([{ pizzas: response.data }]);
   // };

   useEffect(() => {
      const viewProduct = pathname.slice(1) as ProductView;
      onChangeView(viewProduct);
      dispatch(fetchViewProducts({}));
   }, [dispatch, onChangeView, pathname]);

   // if (!cards[0]) {
   //    return;
   // }

   // if (!cards[0].pizzas) {
   //    return;
   // }

   // const pricePizzaFromSize = cards[0].pizzas.map((card) => {
   //    if (sizePizza === 'small') {
   //       return { ...card, price: card.price[0] };
   //    }
   //    if (sizePizza === 'average') {
   //       return { ...card, price: card.price[1] };
   //    }
   //    return { ...card, price: card.price[2] };
   // });

   // const popularProducts = pricePizzaFromSize.filter((card) => card.popular);

   return (
      <Page className={classNames(cls.MainPage, {}, [className])}>
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
         {/* <HorizontalScrolling
            elements={popularProducts}
            widthBlock={1110}
            heightBlock={108}
            widthElement={255}
            heightElement={99}
            imageSmall
            gap={30}
            shadowsOpacity={0.06}
            visibleElements={4}
         /> */}
         <img src={Man} className={cls.man} alt='man' />
         <img src={Woman} className={cls.woman} alt='woman' />

         <MainPageProducts />
         <DeliveryPay />
      </Page>
   );
});
