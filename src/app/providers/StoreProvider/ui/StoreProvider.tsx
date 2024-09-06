import { type ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '../config/store';

interface StoreProviderProps {
   children: ReactNode;
   // initialState?: StateSchema;
}

export const StoreProvider = (props: StoreProviderProps) => {
   const { children } = props;

   // const store = createReduxStore(initialState);

   return <Provider store={store}>{children}</Provider>;
};
