import {
   type AnyAction,
   type CombinedState,
   type EnhancedStore,
   type Reducer,
   type ReducersMapObject,
} from '@reduxjs/toolkit';
import { type AxiosInstance } from 'axios';
import { type TokenSchema, type UserSchema } from '@/entities/User';
import { type AuthPhoneSchema } from '@/features/AuthByPhone';
import { type rtkApi } from '@/shared/api/rtkApi';
import { type MainPageSchema } from '@/pages/MainPage';
import { type ScrollSaveSchema } from '@/features/ScrollSave';

export interface StateSchema {
   mainPage: MainPageSchema;
   user: UserSchema;
   csrfToken: TokenSchema;
   scroll: ScrollSaveSchema;

   [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>; // 11_2 9min

   // Асинхронные редюсеры (необязательные)
   authPhone?: AuthPhoneSchema;
}

// типы для ReducerManager (5_1 15min)===================================
// ключи названий редьюсеров
export type StateSchemaKey = keyof StateSchema;
// eslint-disable-next-line no-undef
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;
export interface ReducerManager {
   getReducerMap: () => ReducersMapObject<StateSchema>;
   reduce: (
      state: StateSchema,
      action: AnyAction,
   ) => CombinedState<StateSchema>;
   add: (key: StateSchemaKey, reducer: Reducer) => void;
   remove: (key: StateSchemaKey) => void;
   // true -  вмонтирован редьюсер, false - нет 9_1 9мин
   getMountedReducers: () => MountedReducers;
}
export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
   reducerManager: ReducerManager;
}
// ========================================================================

// настраиваем thunk добавляем через extraArgument настройку axios
export interface ThunkExtraArg {
   api: AxiosInstance;
}

// thunkAPI - { rejectValue: string, extra: ThunkExtraArg }
// преобразуем
// дженерик Т - тип ошибки
export interface ThunkConfig<T> {
   rejectValue: T;
   extra: ThunkExtraArg;
   state: StateSchema;
}
