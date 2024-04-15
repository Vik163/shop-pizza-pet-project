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
import { Scrollbar } from '@/shared/ui/Scrollbar';
import { AdditivesList } from '../AdditivesList/AdditivesList';

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
         {cards && (
            <Scrollbar
               heightContainer={280}
               name='additives'
               scrollWidth={5}
               className={classNames(cls.Additives, {}, [])}
            >
               <AdditivesList className={cls.container} cards={cards} />
            </Scrollbar>
         )}
      </DynamicReducersLoader>
   );
});

export default Additives;
