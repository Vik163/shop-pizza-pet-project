import { $api } from '@/shared/api/api';
import { csrfTokenActions } from '../slice/tokenSlice';
import { AppDispatch } from '@/app/providers/StoreProvider/config/store';

export const fetchTokenForm = (dispatch: AppDispatch): void => {
   $api.get('/guard').then((data) => {
      const token = data.data.guard;
      if (token) {
         dispatch(csrfTokenActions.setToken(token));
      }
   });
};
