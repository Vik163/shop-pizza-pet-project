import { memo, useEffect, useState } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './MainPage.module.scss';
import { Page } from '@/widgets/Page';

import MainImage_1 from '@/shared/assets/images/image_1.jpg';
import MainImage_2 from '@/shared/assets/images/image_2.jpg';
import MainImage_3 from '@/shared/assets/images/image_3.jpg';
import Man from '@/shared/assets/images/man.png';
import Woman from '@/shared/assets/images/woman.png';

import { HorizontalScrolling } from '@/shared/ui/HorizontalScrolling/HorizontalScrolling';
import {
   HeaderTagType,
   Text,
   TextAlign,
   FontColor,
   FontSize,
   FontWeight,
} from '@/shared/ui/Text';
import { fetchProductsList } from '../../model/services/fetchProductsList/fetchProductsList';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import axios from 'axios';
import { Product } from '@/entities/Product/model/types/product';
import { MainPageProducts } from '../MainPageProducts/MainPageProducts';
import { Products } from '../MainPageProducts/model/types/mainPageProducts';
import { DeliveryPay } from '../DeliveryPay/DeliveryPay';
import { YandexLoginPage } from '@/pages/YandexLoginPage';

interface MainPageProps {
   className?: string;
}

const arrComp = [
   MainImage_3,
   MainImage_1,
   MainImage_2,
   MainImage_3,
   MainImage_1,
   MainImage_2,
   MainImage_3,
];

export const MainPage = memo((props: MainPageProps) => {
   const { className } = props;
   const dispatch = useAppDispatch();

   console.log('o');

   const [cards, setCards] = useState<Products>([]);
   const [sizePizza, setSizePizza] = useState<string>('average');

   const a = async () => {
      const response = await axios.get<Product[]>(
         'https://pizzashop163.ru/api/pizzas',
         {
            withCredentials: true,
         },
      );
      if (!response.data) {
         throw new Error();
      }
      setCards([{ pizzas: response.data }]);
   };

   useEffect(() => {
      a();
   }, []);

   if (!cards[0]) {
      return;
   }

   if (!cards[0].pizzas) {
      return;
   }

   const pricePizzaFromSize = cards[0].pizzas.map((card) => {
      if (sizePizza === 'small') {
         return { ...card, price: card.price[0] };
      } else if (sizePizza === 'average') {
         return { ...card, price: card.price[1] };
      } else {
         return { ...card, price: card.price[2] };
      }
   });

   const popularProducts = pricePizzaFromSize.filter((card) => card.popular);

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
         <HorizontalScrolling
            elements={popularProducts}
            widthBlock={1110}
            heightBlock={108}
            widthElement={255}
            heightElement={99}
            imageSmall
            gap={30}
            shadowsOpacity={0.06}
            visibleElements={4}
         />
         <img src={Man} className={cls.man} />
         <img src={Woman} className={cls.woman} />

         <MainPageProducts cards={cards} />
         <DeliveryPay />
      </Page>
   );
});
