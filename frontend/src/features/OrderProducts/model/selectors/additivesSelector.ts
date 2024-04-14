import { StateSchema } from '@/app/providers/StoreProvider';

export const getAdditives = (state: StateSchema) => state.additives?.additives;
