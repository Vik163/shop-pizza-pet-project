import {
   type CombinedState,
   type Reducer,
   type ReducersMapObject,
   configureStore,
} from '@reduxjs/toolkit';
import { type StateSchema } from './StateSchema';
import { csrfTokenReducer, userReducer } from '@/entities/User';
import { rtkApiTokens } from '@/shared/api/rtkApi';
import { createReducerManager } from './reducerManager';
import { mainPageReducer } from '@/pages/MainPage';
import { actionsReducer } from '@/entities/Action';
import { basketReducer } from '@/entities/Basket';
import { productReducer } from '@/entities/Product';

const initialState = {} as StateSchema;

// создаю функцию которая возвращает store (можно переиспользовать)
export function createReduxStore(
   // eslint-disable-next-line @typescript-eslint/no-shadow
   initialState?: StateSchema,
   asyncReducers?: ReducersMapObject<StateSchema>,
) {
   // ReducersMapObject тип для корневого редьюсера
   const rootReducers: ReducersMapObject<StateSchema> = {
      ...asyncReducers, // необязательные редьюсеры
      user: userReducer,
      basket: basketReducer,
      mainPage: mainPageReducer,
      csrfToken: csrfTokenReducer,
      actions: actionsReducer,
      product: productReducer,
      [rtkApiTokens.reducerPath]: rtkApiTokens.reducer, // Добавить все api сюда и в middleware ниже
   };

   // Для удаления и добавления ассинхронный редьюсеров 5_1 14min
   const reducerManager = createReducerManager(rootReducers);

   // настраиваем thunk добавляем через extraArgument настройку axios
   // const extraArg: ThunkExtraArg = {
   //    api: $api,
   // };

   const store = configureStore({
      // as Reducer<CombinedState<StateSchema>> 5_6 - 13 min 18min
      // важно вызывать .reduce иначе редьсеры не добавяться при монтировании
      reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
      devTools: __IS_DEV__, // отключается для продакшена
      preloadedState: initialState,
      // axios
      // добавляем в thunk через extraArgument настройку axios 5_4 2min
      middleware: (getDefaultMiddleware) =>
         getDefaultMiddleware().concat(
            //    {
            //    thunk: {
            //       extraArgument: extraArg,
            //    },
            // }
            rtkApiTokens.middleware,
         ),
   });

   // в store поля reducerManager не существует, добавляем его
   // @ts-expect-error не разбираться
   store.reducerManager = reducerManager;

   return store;
}

export const store = createReduxStore(initialState);
// export type AppDispatch = typeof store.dispatch
// снаружи получить dispatch не можем,
// поэтому используем ReturnType<typeof createReduxStore>
// получаем тип самого store и нужно добавить ['dispatch'], чтобы получить его тип

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
