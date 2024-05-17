import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './OrderPage.module.scss';
import { DynamicReducersLoader } from '@/shared/lib/components/DynamicReducersLoader';
import { HStack } from '@/shared/ui/Stack';
import { FlexAlign, FlexJustify } from '@/shared/ui/Stack/Flex';
import { Icon } from '@/shared/ui/Icon';
import { OrderLevel } from '@/features/OrderLevel';
import logo from '@/shared/assets/icons/shop_logo.png';

import { orderReducer } from '@/entities/Order';
import { Page } from '@/widgets/Page';
import { OrderMainInfo } from '../OrderMainInfo/ui/OrderMainInfo/OrderMainInfo';
import { StructureOrder } from '../StructureOrder/StructureOrder';

export interface OrderPageProps {
   className?: string;
}

const initialReducers = {
   order: orderReducer,
};

const OrderPage = memo((props: OrderPageProps) => {
   const { className } = props;

   return (
      <DynamicReducersLoader
         removeAfterUnmount={false}
         reducers={initialReducers}
      >
         <Page className={classNames(cls.OrderPage, {}, [className])}>
            <HStack max justify={FlexJustify.BETWEEN} className={cls.header}>
               <Icon src={logo} />
               <OrderLevel />
            </HStack>
            <HStack
               max
               justify={FlexJustify.BETWEEN}
               align={FlexAlign.START}
               className={cls.main}
            >
               <OrderMainInfo />
               <StructureOrder />
            </HStack>
            <div className={cls.line} />
         </Page>
      </DynamicReducersLoader>
   );
});

export default OrderPage;
