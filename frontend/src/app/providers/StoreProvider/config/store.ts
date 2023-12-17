import {
   CombinedState,
   Reducer,
   ReducersMapObject,
   configureStore,
} from '@reduxjs/toolkit';
import { StateSchema, ThunkExtraArg } from './StateSchema';
import { mainPageReducer } from '@/pages/MainPage/model/slices/mainPageSlice';
import { userReducer } from '@/entities/User';
import { $api } from '@/shared/api/api';
import { rtkApi } from '@/shared/api/rtkApi';
import { createReducerManager } from './reducerManager';

const initialState = {} as StateSchema;

// создаю функцию которая возвращает store (можно переиспользовать)
export function createReduxStore(
   initialState?: StateSchema,
   asyncReducers?: ReducersMapObject<StateSchema>,
) {
   // ReducersMapObject тип для корневого редьюсера
   const rootReducers: ReducersMapObject<StateSchema> = {
      ...asyncReducers, // необязательные редьюсеры
      user: userReducer,
      mainPage: mainPageReducer,
      [rtkApi.reducerPath]: rtkApi.reducer, // 11_2 8min
   };

   // Для удаления и добавления ассинхронный редьюсеров 5_1 14min
   const reducerManager = createReducerManager(rootReducers);

   // настраиваем thunk добавляем через extraArgument настройку axios
   const extraArg: ThunkExtraArg = {
      api: $api,
   };

   const store = configureStore({
      // as Reducer<CombinedState<StateSchema>> 5_6 - 13 min 18min
      // важно вызывать .reduce иначе редьсеры не добавяться при монтировании
      reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
      devTools: __IS_DEV__, // отключается для продакшена
      preloadedState: initialState,
      // axios
      // добавляем в thunk через extraArgument настройку axios 5_4 2min
      middleware: (getDefaultMiddleware) =>
         getDefaultMiddleware({
            thunk: {
               extraArgument: extraArg,
            },
         }).concat(rtkApi.middleware),
   });

   // в store поля reducerManager не существует, добавляем его
   // @ts-ignore
   store.reducerManager = reducerManager;

   return store;
}

export const store = createReduxStore(initialState);
// export type AppDispatch = typeof store.dispatch
// снаружи получить dispatch не можем,
// поэтому используем ReturnType<typeof createReduxStore>
// получаем тип самого store и нужно добавить ['dispatch'], чтобы получить его тип

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
