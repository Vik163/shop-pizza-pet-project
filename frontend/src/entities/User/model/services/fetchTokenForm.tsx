import { $api } from '@/shared/api/api';
import { csrfTokenActions } from '../slice/tokenSlice';
import { type AppDispatch } from '@/app/providers/StoreProvider/config/store';

export const fetchTokenForm = (dispatch: AppDispatch): void => {
   $api.get('/csrf').then((data) => {
      const token = data.data.csrf;
      if (token) {
         dispatch(csrfTokenActions.setToken(token));
      }
   });
};
