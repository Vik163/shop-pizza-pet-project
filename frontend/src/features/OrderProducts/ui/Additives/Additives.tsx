import { memo, useEffect } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Additives.module.scss';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { fetchAdditives } from '../../model/services/fetchAddivites';

export interface AdditivesProps {
   className?: string;
}

const Additives = memo((props: AdditivesProps) => {
   const { className } = props;
   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(fetchAdditives());
   }, []);

   return <div className={classNames(cls.Additives, {}, [className])}></div>;
});

export default Additives;
