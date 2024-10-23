import { rtkApi } from '@/shared/api/rtkApi';
import { Action } from '../model/types/actions';

const actionsApi = rtkApi.injectEndpoints({
   endpoints: (build) => ({
      setActions: build.query<Action[], void>({
         query: () => ({
            url: '/actions',
            method: 'GET',
         }),
      }),
   }),
});

export const setActions = actionsApi.endpoints.setActions.initiate;
