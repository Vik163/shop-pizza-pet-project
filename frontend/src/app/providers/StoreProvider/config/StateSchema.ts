import { TokenSchema, UserSchema } from '@/entities/User';
import { AuthPhoneSchema } from '@/features/AuthByPhone/model/types/authPhone';
import { MainPageShema } from '@/pages/MainPage/model/types/mainPageSchema';
import { rtkApi } from '@/shared/api/rtkApi';
import {
   AnyAction,
   CombinedState,
   EnhancedStore,
   Reducer,
   ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

export interface StateSchema {
   mainPage: MainPageShema;
   user: UserSchema;
   [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>; // 11_2 9min

   // Асинхронные редюсеры (необязательные)
   authPhone?: AuthPhoneSchema;
   csrfToken?: TokenSchema;
}

// типы для ReducerManager (5_1 15min)===================================
// ключи названий редьюсеров
export type StateSchemaKey = keyof StateSchema;
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
