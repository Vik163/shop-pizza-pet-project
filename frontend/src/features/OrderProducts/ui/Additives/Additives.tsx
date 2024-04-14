import { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Additives.module.scss';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { fetchAdditives } from '../../model/services/fetchAddivites';
import { getAdditives } from '../../model/selectors/additivesSelector';
import {
   DynamicReducersLoader,
   ReducersList,
} from '@/shared/lib/components/DynamicReducersLoader';
import { additivesReducer } from '../../model/slices/additivesSlice';
import { HStack } from '@/shared/ui/Stack';
import { AdditivesCard } from '../AdditivesCard/AdditivesCard';
import { FlexWrap } from '@/shared/ui/Stack/Flex';
import { Scrollbar } from '@/shared/ui/Scrollbar';

export interface AdditivesProps {
   className?: string;
}

const initialReducer: ReducersList = {
   additives: additivesReducer,
};

const Additives = memo((props: AdditivesProps) => {
   const { className } = props;
   const dispatch = useAppDispatch();
   const cards = useSelector(getAdditives);
   console.log('cards:', cards);

   useEffect(() => {
      if (!cards) dispatch(fetchAdditives());
   }, [cards, dispatch]);

   return (
      <DynamicReducersLoader removeAfterUnmount reducers={initialReducer}>
         <Scrollbar heightContainer={280} name='additives'>
            <HStack
               wrap={FlexWrap.WPAP}
               gap={12}
               className={classNames(cls.Additives, {}, [className])}
            >
               {cards?.map((card) => (
                  <AdditivesCard key={card._id} card={card} />
               ))}
            </HStack>
         </Scrollbar>
      </DynamicReducersLoader>
   );
});

export default Additives;
