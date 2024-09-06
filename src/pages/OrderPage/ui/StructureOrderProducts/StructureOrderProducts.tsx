import { memo } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './StructureOrderProducts.module.scss';
import { HStack, VStack } from '@/shared/ui/Stack';
import { FontSize, FontWeight, Text } from '@/shared/ui/Text';
import { BasketOneProduct, getBasketProducts } from '@/entities/Basket';
import { FlexAlign, FlexJustify } from '@/shared/ui/Stack/Flex';
import { Scrollbar } from '@/shared/ui/Scrollbar';

interface StructureOrderProductsProps {
   className?: string;
}

export const StructureOrderProducts = memo(
   (props: StructureOrderProductsProps) => {
      const { className } = props;
      const basketProducts = useSelector(getBasketProducts);

      return (
         <VStack
            className={classNames(cls.StructureOrderProducts, {}, [className])}
            align={FlexAlign.START}
         >
            {basketProducts && (
               <Scrollbar
                  name='structure'
                  countChildren={basketProducts.length}
                  heightContainer={267}
                  widthContainer={308}
                  scrollWidth={3}
               >
                  {basketProducts.map((item: BasketOneProduct) => (
                     <HStack
                        key={item.product._id}
                        className={cls.container}
                        justify={FlexJustify.BETWEEN}
                     >
                        <Text
                           fontSize={FontSize.SIZE_16}
                           fontWeight={FontWeight.TEXT_500}
                           className={cls.title}
                        >
                           {item.product.title} <br />
                           {item.product.type === 'pizzas' && (
                              <span className={cls.pizzaInfo}>
                                 {item.sizePizza} {item.dia} см, {item.dough}{' '}
                                 тесто
                              </span>
                           )}
                        </Text>
                        <Text
                           fontSize={FontSize.SIZE_17}
                           fontWeight={FontWeight.TEXT_700}
                        >
                           {item.totalPrice}&#8381;
                        </Text>
                     </HStack>
                  ))}
               </Scrollbar>
            )}
         </VStack>
      );
   },
);
