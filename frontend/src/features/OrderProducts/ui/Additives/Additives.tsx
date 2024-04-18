import { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Additives.module.scss';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import {
   getAdditives,
   getOrderAdditives,
} from '../../model/selectors/additivesSelector';
import {
   DynamicReducersLoader,
   ReducersList,
} from '@/shared/lib/components/DynamicReducersLoader';
import {
   additivesActions,
   additivesReducer,
} from '../../model/slices/additivesSlice';
import { Scrollbar } from '@/shared/ui/Scrollbar';
import { IAdditives } from '../../model/types/additives';
import { fetchAdditives } from '../../model/services/fetchAddivites';
import { AdditivesCard } from '../AdditivesCard/AdditivesCard';

export interface AdditivesProps {
   // orderAdditives: string[];
}

const initialReducer: ReducersList = {
   additives: additivesReducer,
};

const Additives = memo(() => {
   const dispatch = useAppDispatch();
   const cards = useSelector(getAdditives);
   const orderAdditives = useSelector(getOrderAdditives);
   const orderAdditivesTitle = orderAdditives?.orderAdditivesTitle;

   useEffect(() => {
      if (!cards) dispatch(fetchAdditives());
   }, [cards, dispatch]);

   const onCard = useCallback(
      (card: IAdditives) => {
         // создал reselect для мемоизации (после dispatch нужных данных расчет в селекторе)
         dispatch(
            additivesActions.additivesSelect({
               card,
               orderAdditives: orderAdditivesTitle || [],
            }),
         );
      },
      [dispatch, orderAdditivesTitle],
   );

   return (
      <DynamicReducersLoader removeAfterUnmount reducers={initialReducer}>
         {cards && (
            <Scrollbar
               heightContainer={280}
               name='additives'
               scrollWidth={5}
               className={classNames(cls.Additives, {}, [])}
            >
               <div className={cls.container}>
                  {cards.map((card) => (
                     <AdditivesCard
                        key={card._id}
                        card={card}
                        onCard={onCard}
                     />
                  ))}
               </div>
            </Scrollbar>
         )}
      </DynamicReducersLoader>
   );
});

export default Additives;
