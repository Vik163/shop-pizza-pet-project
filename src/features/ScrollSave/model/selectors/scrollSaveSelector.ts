import { StateSchema } from '@/app/providers/StoreProvider';

export const getSaveScroll = (state: StateSchema) => state.scroll.scroll;
