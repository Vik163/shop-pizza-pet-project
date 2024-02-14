import {
   type AnyAction,
   combineReducers,
   type Reducer,
   type ReducersMapObject,
} from '@reduxjs/toolkit';
import {
   type MountedReducers,
   type ReducerManager,
   type StateSchema,
   type StateSchemaKey,
} from './StateSchema';

// Для удаления и добавления ассинхронный редьюсеров 5_1
export function createReducerManager(
   initialReducers: ReducersMapObject<StateSchema>,
): ReducerManager {
   // Create an object which maps keys to reducers
   const reducers = { ...initialReducers };

   // Создаем корневой редьюсер combinedReducer
   let combinedReducer = combineReducers(reducers);

   // Массив названий редьюсеров, которые хотим удалить. Добавляем имя
   let keysToRemove: StateSchemaKey[] = [];

   // 9_1 11 min
   const mountedReducers: MountedReducers = {};

   return {
      getReducerMap: () => reducers,
      // getMountedReducers: () => mountedReducers,
      // The root reducer function exposed by this object
      // This will be passed to the store
      getMountedReducers: () => mountedReducers,
      reduce: (state: StateSchema, action: AnyAction) => {
         // If any reducers have been removed, clean up their state first
         if (keysToRemove.length > 0) {
            state = { ...state };
            // по ключу-названию удаляем редьюсер из стейта
            keysToRemove.forEach((key) => {
               delete state[key];
            });
            keysToRemove = [];
         }
         // Delegate to the combined reducer
         return combinedReducer(state, action);
      },

      // добавляет новый редьюсер
      add: (key: StateSchemaKey, reducer: Reducer) => {
         if (!key || reducers[key]) {
            return;
         }
         // Add the reducer to the reducer mapping
         reducers[key] = reducer;
         mountedReducers[key] = true;
         // Generate a new combined reducer
         combinedReducer = combineReducers(reducers);
      },

      // Removes a reducer with the specified key
      remove: (key: StateSchemaKey) => {
         if (!key || !reducers[key]) {
            return;
         }
         // Remove it from the reducer mapping
         delete reducers[key];
         // Add the key to the list of keys to clean up
         keysToRemove.push(key);
         mountedReducers[key] = false;
         // Generate a new combined reducer
         combinedReducer = combineReducers(reducers);
      },
   };
}
