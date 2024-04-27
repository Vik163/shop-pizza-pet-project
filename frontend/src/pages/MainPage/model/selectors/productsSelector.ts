import { StateSchema } from '@/app/providers/StoreProvider';

export const getCards = (state: StateSchema) =>
   state.mainPage.cards || { pizzas: [] };
