import { ReactNode, useEffect } from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch/useAppDispatch';
import { useStore } from 'react-redux';
import { Reducer } from '@reduxjs/toolkit';
import {
   StateSchema,
   ReduxStoreWithManager,
   StateSchemaKey,
} from '@/app/providers/StoreProvider';

// ОБорачиваем каждый компонент где нужен ассинхронный редьюсер
// NonNullable исключает  редьюсеры null или undefined
export type ReducersList = {
   [name in StateSchemaKey]?: Reducer<NonNullable<StateSchema[name]>>;
};

interface DynamicReducersLoaderProps {
   removeAfterUnmount?: boolean;
   children: ReactNode;
   reducers: ReducersList;
}

export const DynamicReducersLoader = (props: DynamicReducersLoaderProps) => {
   const { children, removeAfterUnmount = true, reducers } = props;

   const store = useStore() as ReduxStoreWithManager;
   const dispatch = useAppDispatch();

   useEffect(() => {
      const mountedReducers = store.reducerManager.getMountedReducers();

      // Object.entries получаем из массива редьюсер и его имя
      Object.entries(reducers).forEach(([name, reducer]) => {
         const mounted = mountedReducers[name as StateSchemaKey];

         if (!mounted) {
            store.reducerManager.add(name as StateSchemaKey, reducer);
            dispatch({ type: `@INIT ${name} reducer` });
         }
      });

      return () => {
         Object.entries(reducers).forEach(([name, reducer]) => {
            if (removeAfterUnmount) {
               store.reducerManager.remove(name as StateSchemaKey);
               dispatch({ type: `@DESTROY ${name} reducer` });
            }
         });
      };
   }, []);

   return <>{children}</>;
};
