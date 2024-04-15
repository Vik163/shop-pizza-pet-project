import { memo } from 'react';
import { AdditivesCard } from '../AdditivesCard/AdditivesCard';
import { Additives } from '../../model/types/additives';
import { classNames } from '@/shared/lib/classNames/classNames';

interface AdditivesListProps {
   className?: string;
   cards: Additives[];
}

export const AdditivesList = memo((props: AdditivesListProps) => {
   const { cards, className } = props;

   return (
      <div className={classNames('', {}, [className])}>
         {cards?.map((card) => <AdditivesCard key={card._id} card={card} />)}
      </div>
   );
});
